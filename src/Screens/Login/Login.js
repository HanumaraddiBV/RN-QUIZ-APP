import axios from 'axios';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
const {width} = Dimensions.get('window');
// import Container, {Toast} from 'toastify-react-native';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  I18nManager,
  ToastAndroid,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SIGNUP_ROUTE, USERS_API} from '../../components/constatnts/constants';
import {isUserIsLogIn, isUserSignOut} from '../../Redux/Actions';
export default function Login({navigation}) {
  const {t} = useTranslation();
  // const history = useHistory();
  const dispatch = useDispatch();
  //getting the global store data using useSelector  hook

  const {userDetails} = useSelector(store => store.userInfo);
  // console.log('userDetails:', userDetails);
  //destructuring the email and password from userDetails
  const {email, password} = userDetails;

  const [userData, setUserData] = useState({email: '', password: ''});
  const [isAuth, setIsAuth] = useState(false);
  const handleChange = (key, val) => {
    // seting the state based on user input
    setUserData({...userData, [key]: val});
  };

  const showToastWithGravity = notify => {
    ToastAndroid.showWithGravity(
      notify,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };
  const loginHandler = () => {
    axios
      .get(USERS_API)
      .then(res => {
        const userAllList = res.data;
        // console.log("userAllList:", userAllList);
        let flag = false;
        let isEmail = true;
        let isPassword = true;
        let loginDetailsOfUser;
        for (let i = 0; i < userAllList.length; i++) {
          //confirming the both login page data with the data is already stored by signup page into the global state comparing the both of them

          if (
            userData.email == userAllList[i].email &&
            userData.password == userAllList[i].password
          ) {
            flag = true;
            loginDetailsOfUser = userAllList[i];
          } else if (
            userData.email == userAllList[i].email &&
            userData.password !== userAllList[i].password
          ) {
            isPassword = false;
          } else if (
            userData.password == userAllList[i].password &&
            userData.email !== userAllList[i].email
          ) {
            isEmail = false;
          }
        }
        if (flag) {
          setIsAuth(true);
          showToastWithGravity('You are successfully log in');
          dispatch(isUserIsLogIn(loginDetailsOfUser));
          navigation.navigate('Home');
        } else if (!isEmail) {
          showToastWithGravity(
            'You have entered wrong email. Please check your email',
          );
        } else if (!isPassword) {
          showToastWithGravity(
            'You have entered wrong password. Please check your password',
          );
        } else {
          setIsAuth(false);

          showToastWithGravity(
            'Your entering a wrong credentials or you have to sign up first',
          );
        }
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(userData);
  };

  const handleLogOut = () => {
    showToastWithGravity('You are successfully log out. Thank You,Visit again');
    dispatch(isUserSignOut());
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      {!userDetails.id ? (
        <View style={styles.cantainer}>
          {/* <Text
            style={[
              styles.headerTxt,
              {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
            ]}>
            {t('Welcome')}
          </Text> */}
          <View style={styles.LotteView}>
            <LottieView
              source={require('../../lotteAnimations/LoginAnime.json')}
              autoPlay
              loop
              style={{width: width / 1.2}}
            />
          </View>
          <View style={styles.subView}>
            <Text style={styles.subTxt}>{t('Login')}</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={t('Enter Your Email')}
              onChangeText={val => handleChange('email', val)}
            />
            <TextInput
              style={styles.nameInput}
              secureTextEntry={true}
              placeholder={t('Enter Your Password')}
              onChangeText={val => handleChange('password', val)}
            />
            <TouchableOpacity style={styles.btn} onPress={loginHandler}>
              <Text style={styles.btnTxt}> {t('Login')}</Text>
            </TouchableOpacity>
            <View style={styles.endView}>
              <Text style={styles.endTxt}>{t('Create New Account')}</Text>
              <TouchableOpacity
                style={styles.endBtn}
                onPress={() => navigation.navigate(SIGNUP_ROUTE)}>
                <Text style={styles.loginTxt}>{t('Signup')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.logOut}>
          <Text style={{fontSize: 22}}>
            If You want to log out from our app you can click below button
          </Text>
          <TouchableOpacity
            onPress={handleLogOut}
            style={styles.btnContainerStyle}>
            <Text style={styles.btnTextStyle}>{t('Logout')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: '#7051d6',
    // height: 700,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    backgroundColor: 'white',
    height: 430,
    marginTop: 120,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: 140,
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: '#8b80b6',
    borderRadius: 80,
    // borderWidth: 2,
    marginLeft: 90,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  endView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTxt: {
    fontSize: 17,
    marginTop: 30,
    marginLeft: 30,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 20,
    color: '#2da7ee',
  },
  logOut: {
    width: 300,
    marginTop: 122,
    padding: 10,
  },
  btnContainerStyle: {
    backgroundColor: '#3F51B5',
    paddingVertical: 15,
    width: width / 1.6,
    borderRadius: 5,
    marginTop: 10,
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
  LotteView: {
    width: '90%',
    height: 0,
    // marginTop: 10,
    top: -60,
    shadowColor: '#0078AA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
