import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
const {width} = Dimensions.get('window');
import {withTranslation} from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lanValue: 'en',
      lanIndex: 0,
      lanList: ['en', 'ar', 'sp'],
    };
    this.rotateValue = new Animated.Value(0);
  }
  changeLanguageHandler = () => {
    const {t, i18n} = this.props;
    // console.log('ho',i18)
    if (this.state.lanValue == 'en') {
      i18n.changeLanguage('en');
    } else if (this.state.lanValue == 'sp') {
      i18n.changeLanguage('sp');
    } else {
      i18n.changeLanguage('ar');
    }
  };
  render() {
    let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'], // degree of rotation
    });
    let transformStyle = {transform: [{rotate: rotation}]};
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}
        
        >
          <Image
            style={{
              width: 50,
              height: 50,
              elevation: 50,
              shadowColor: '#0078AA',
              borderRadius: 10,
              zIndex: 1,
            }}
            source={{
              uri: 'https://play-lh.googleusercontent.com/-dGSUTdes6YTUtZfrtFfTsRPiIMCB8e2ykbhXDCg36qnvxdG_B6G51tNlvm66nPNrg',
            }}
          />
          <Text
            style={styles.title}
          
            >
            Quizee
          </Text>
        </View>
        <View style={styles.rightIcons}>
         
          <Icon
            name={'user'}
            size={24}
            color={'black'}
            onPress={() => this.props.navigation.navigate('Login')}
          />
     
          <View style={styles.pickerList}>
            <SelectDropdown
              data={this.state.lanList}
              defaultValueByIndex={this.state.lanIndex}
              defaultValue={this.state.lanValue}
              onSelect={(selectedItem, index) => {
                this.setState(
                  {
                    ...this.state,
                    lanValue: selectedItem,
                    lanIndex: index,
                  },
                  () => {
                    this.changeLanguageHandler(this.state.lanValue);
                  },
                );
              }}
          
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <TouchableWithoutFeedback
                      onPressIn={() => {
                        Animated.timing(this.rotateValue, {
                          toValue: 0,
                          duration: 700,
                          easing: Easing.linear,
                          useNativeDriver: true,
                        }).start();
                    
                      }}
                      onPressOut={() => {
                        Animated.timing(this.rotateValue, {
                          toValue: 1,
                          duration: 350,
                          easing: Easing.linear,
                          useNativeDriver: true,
                        }).start();
                      }}>
                      <Animated.View style={transformStyle}>
                        <Ionicons
                          name="md-earth-sharp"
                          color={'black'}
                          size={25}
                        />
                      </Animated.View>
                    </TouchableWithoutFeedback>
                  
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
         
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Text style={styles.dropdown3RowTxt}>{item}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    height: 62,
    borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'white',
    opacity: 0.6,
    padding: 5,
   
  },

  rightIcons: {
    flexDirection: 'row',
    width: 100,
    marginLeft: -40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 2,
    marginRight: 10,
    // borderColor: 'teal',
  },
  title: {
    // marginRight:100,
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    // borderWidth: 'blue',
    // borderWidth: 2,
    marginLeft: 20,
    alignItems: 'center',
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#FFF',
    paddingHorizontal: 0,
    // borderWidth: 1,
    // borderRadius: 1,
    // borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  dropdown3BtnTxt: {
    // color: '#444',
    textAlign: 'center',
    fontWeight: '450',
    fontSize: 18,
    marginHorizontal: 9,
  },
  dropdown3DropdownStyle: {
    // backgroundColor: 'slategray'
  },
  dropdown3RowStyle: {
    // backgroundColor: 'slategray',
    // borderBottomColor: '#444',
    height: 40,
  },
  dropdown3RowChildStyle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3RowTxt: {
    // color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: '450',
    fontSize: 18,
    // marginHorizontal: ,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    email: state.userInfo.userDetails.email,
    password: state.userInfo.userDetails.password,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps)(withTranslation()(Header));
