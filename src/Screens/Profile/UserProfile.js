import {
  Dimensions,
  ImageBackground,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {Avatar} from 'react-native-paper';
const {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import {createRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      fileUri: '',
    };
    this.panelRef = createRef(null);
  }
  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        console.log('source', source.assets[0].uri);
        this.setState({
          fileUri: source.assets[0].uri,
        });
      }
    });
  };
  launchImageLibrary = () => {
    console.log('called');
    let options = {
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        console.log('source', source.assets[0].uri);
        this.setState({
          fileUri: source.assets[0].uri,
        });
      }
    });
  };

  renderFileUri() {
    console.log(this.state.fileUri ? 'empty' : 'und');
    if (this.state.fileUri) {
      return (
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: this.state.fileUri}} />
          <Image style={styles.img} source={{uri: this.state.fileUri}} />
        </View>
      );
    } else {
      return (
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
            }}
          />
          <Image
            style={styles.img}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
            }}
          />
        </View>
      );
    }
  }
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.launchCamera();
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
        //return granted;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const image = {
      uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    };
    return (
      <View style={styles.container}>
        <View style={styles.backImgContainer}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}></ImageBackground>
        </View>
        <View style={styles.userDetails}>
          <Avatar.Image
            size={150}
            source={
              this.state.fileUri
                ? {uri: this.state.fileUri}
                : require('../../../Assets/hero.png')
            }
          />
          <Text style={{fontSize: 22}}>{this.props.userId.name}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.RBSheet.open();
              console.log('hii');
            }}>
            <Text> Edit Profile </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sections}>
          <View style={styles.subSection}>
            <Text style={styles.sectionText}>Privacy Settings</Text>
            <Icon name="user-circle-o" size={24} color="#e91e63" />
          </View>
          <View style={styles.subSection}>
            <Text style={styles.sectionText}>Notifications</Text>
            <Icon name="bell" size={24} color="#e91e63" />
          </View>
          <View style={styles.subSection}>
            <Text style={styles.sectionText}>Quiz Progress Report</Text>
            <Icon name="pie-chart" size={24} color="#e91e63" />
          </View>
          <View style={styles.subSection}>
            <Text style={styles.sectionText}>About Us</Text>
            <Icon name="info" size={26} color="#e91e63" />
          </View>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <Text style={{fontSize:22, marginTop:-100,marginBottom:40}}>Select Image from</Text>
          <View style={styles.bottomSheetBtns}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.launchImageLibrary();
              }}>
              <Text>From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.requestCameraPermission();
                console.log('camer')
              }}>
              <Text>Camera</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImgContainer: {
    borderWidth: 1,
    flex: 1,
  },
  userDetails: {
    flexDirection: 'column',
    // width: width/3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: -100,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  sections: {
    flex: 2,
    // justifyContent:'center',
    alignItems: 'center',
  },
  subSection: {
    // borderWidth:0.4,

    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 65,
    width,
    padding: 20,
    marginTop: 2,
    // borderTopColor: 'grey',
    // borderTopWidth: 1,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  img: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
  },
  bottomSheetBtns: {
    flexDirection: 'row',
    alignItems: 'center',
      justifyContent: 'space-around',
    width,
  },
});



const mapStateToProps = state => {
  console.log('state:', state);
  return {
    userId: state.userInfo.userDetails,
    result: state.userInfo.result,
    totalScore: state.userInfo.totalScore,
    categoryName: state.userInfo.categoryName,
    quizResultInfo: state.userProgressInfo.progressData,
  };
};
export default connect(mapStateToProps)(UserProfile)