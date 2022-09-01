import React, {Component} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {HOME_ROUTE, LINK_STYLE, LOGIN_ROUTE, QUIZ_ROUTE} from '../../components/constatnts/constants';
const {width} = Dimensions.get('window');
import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import WavyHeader from './WavyHeader';
import {withTranslation} from 'react-i18next';

class CategoryItem extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      selected: null,
    };
    this.scaleValue = new Animated.Value(0);
    this.scaleValue2 = new Animated.Value(0);
    this.scaleValue3 = new Animated.Value(0);
  }

  render() {
    const {t} = this.props;
    const cardScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2],
    });
    let transformStyle = {transform: [{scale: cardScale}]};
    const cardScale2 = this.scaleValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2],
    });
    let transformStyle2 = {transform: [{scale: cardScale2}]};

    const cardScale3 = this.scaleValue3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2],
    });
    let transformStyle3 = {transform: [{scale: cardScale3}]};


    const showToastWithGravityAndOffset = () => {
      ToastAndroid.showWithGravityAndOffset(
        "Sorry You Have to Sign in first to access quiz",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    };
    return (
      <View style={styles.container}>
        <View>
          <WavyHeader customStyles={styles.svgCurve} />
          <View style={styles.LotteView}>
            <LottieView
              source={require('../../lotteAnimations/categoryAnime.json')}
              autoPlay
              loop
              style={{width: 390}}
            />
          </View>
        </View>
        <View style={styles.cardContainer}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              this.scaleValue.setValue(0);
              Animated.timing(this.scaleValue, {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.timing(this.scaleValue, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start(() => {
                this.setState({
                  ...this.state,
                  selected: 'React',
                  modalVisible: true,
                });
              });
            }}>
            <Animated.View style={transformStyle}>
              <View style={styles.card}>
                <Image
                  style={styles.imgIcon}
                  source={require('../../../Assets/React.png')}
                />

                <Text
                  style={{marginLeft: -140, fontWeight: 'bold', fontSize: 19}}>
                  {t('React')}
                </Text>
                <Icon name="angle-right" color={'#444'} size={25} />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={() => {
              this.scaleValue2.setValue(0);
              Animated.timing(this.scaleValue2, {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.timing(this.scaleValue2, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start(() => {
                this.setState({
                  ...this.state,
                  selected: 'Javascript',
                  modalVisible: true,
                });
              });
            }}>
            <Animated.View style={transformStyle2}>
              <View style={styles.card}>
                <Image
                  style={styles.imgIcon}
                  source={require('../../../Assets/Javascript.png')}
                />
                <Text
                  style={{marginLeft: -120, fontWeight: 'bold', fontSize: 19}}>
                  {t('Javascript')}
                </Text>
                <Icon name="angle-right" color={'#444'} size={25} />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={() => {
              this.scaleValue3.setValue(0);
              Animated.timing(this.scaleValue3, {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.timing(this.scaleValue3, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start(() => {
                this.setState({
                  ...this.state,
                  selected: 'Java',
                  modalVisible: true,
                });
              });
            }}>
            <Animated.View style={transformStyle3}>
              <View style={styles.card}>
                <Image
                  style={styles.imgIcon}
                  source={require('../../../Assets/Java.png')}
                />
                <Text
                  style={{marginLeft: -160, fontWeight: 'bold', fontSize: 19}}>
                  {t('Java')}
                </Text>
                <Icon name="angle-right" color={'#444'} size={25} />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          backdropOpacity={0.9}
          onRequestClose={() => {
            this.setState({modalVisible: !this.state.modalVisible});
          }}>
          {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t('Rules')}</Text>
            <View style={styles.modalList}>
              <Text style={styles.modalRules}>1. {t('First_Point')}</Text>
              <Text style={styles.modalRules}>2. {t('Second_Point')}</Text>
              <Text style={styles.modalRules}>3. {t('Third_Point')}</Text>
              <Text style={styles.modalRules}>4. {t('Fourth_Point')}</Text>
              <Text style={styles.modalRules}>5. {t('Fifth_Point')}</Text>
            </View>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    modalVisible: !this.state.modalVisible,
                  })
                }>
                <Text style={styles.textStyle}>{t('Go Back')}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setState({modalVisible: !this.state.modalVisible});
                  // console.log(this.state);
                  if (!this.props.userId.userDetails.email) {
                    // Alert.alert(
                    //   'Sorry You Have to Sign in first to access quiz',
                    // );
                    showToastWithGravityAndOffset()
                    this.props.navigation.navigate(LOGIN_ROUTE);
                  } else {
                    this.props.navigation.navigate(QUIZ_ROUTE, {
                      category: this.state.selected,
                    });
                  }
                }}>
                <Text style={styles.textStyle}>{t('Start Playing')}</Text>
              </Pressable>
            </View>
          </View>
          {/* </View> */}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userInfo,
    result: state.userInfo.result,
    totalScore: state.userInfo.totalScore,
    categoryName: state.userInfo.categoryName,
    quizResultInfo: state.userProgressInfo.progressData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // handleResult: (payload) => dispatch(updatedProgressReport(payload)),
  };
};

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cardContainer: {
    // borderWidth: 1,
    flexDirection: 'column',
    // borderColor:'red',
    // width: width - 30,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
    // backgroundColor: '#6fb1fc',
  },
  card: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    // borderWidth: 1,
    marginTop: 25,
    padding: 18,
    height: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 13,
    width: width - 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  LotteView: {
    position: 'relative',
    width: '100%',
    height: 300,
    // backgroundColor: 'white',

    // marginTop: 20,
    // right: 10,

    // elevation:50,
    shadowColor: '#0078AA',
    borderRadius: 10,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    marginTop: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    width: 110,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '800',
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  modalList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: 250,
    marginTop: 20,
  },
  modalRules: {
    fontSize: 17,
    fontStyle: '500',
  },
  imgIcon: {
    width: 50,
    height: 50,
    elevation: 50,
    shadowColor: '#0078AA',
    borderRadius: 10,
    zIndex: 1,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(CategoryItem));
