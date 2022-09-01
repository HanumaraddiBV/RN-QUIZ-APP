import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
const {width} = Dimensions.get('screen');
import {useDispatch, useSelector} from 'react-redux';
import {addUserDetails} from '../../Redux/Actions';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import validator from 'validator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  HOME_ROUTE,
  LINK_STYLE,
  LOGIN_ROUTE,
  USERS_API,
} from '../../components/constatnts/constants';
const SignInPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  // const history = useHistory();
  //creating state for user details
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });


  const showToastWithGravity = notify => {
   
    ToastAndroid.showWithGravity(
      notify,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  // when user want to know the password based on this state password will be visible in ui
  const [visible, setVisible] = useState(false);

  //this state tells the passwords are matching are not
  const [msg, setMsg] = useState(false);

  //setting the states
  const handleChange = (key, val) => {
    setRegisterData({...registerData, [key]: val});
  };

  // on submitting the data is stored in global state
  const isRegister = () => {
    //checking the both passwords
    if (registerData.password !== registerData.confirmPass) {
      setMsg(true);
      showToastWithGravity('Please check your password once');
    } else {
      setMsg(false);
      // console.log(registerData);

      //validating name
      if (registerData.name.length <= 0) {
        showToastWithGravity('Your name should be atleast one character');
      }

      //validating password to make sure that password has to be strong
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(
          registerData.password,
        )
      ) {
        showToastWithGravity(
          'Your password should be strong. Atleast have one special character,one Uppercase letter,one lowercase letter and one number',
        );
      } else {
        //dispatching the data into reducer

        axios
          .post(USERS_API, {
            id: Math.floor(Math.random() * 20),
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            report: [],
          })
          .then(res => {
            console.log('res:', res);
            const userInfo = res.data;
            dispatch(addUserDetails(userInfo));
            alert(`${registerData.name} you are successfully sign up`);

            navigation.navigate('Home');
          })
          .catch(err => {
            console.log('err:', err);
          });
      }
    }
    // console.log(registerData);
  };

  //logic for password visibility
  const showPass = e => {
    e.preventDefault();
    setVisible(!visible);
  };
  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{marginBottom: 150}}
      enableOnAndroid={true}
      scrollEnabled={true}
      extraScrollHeight={150}
      keyboardShouldPersistTaps="handled"
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={true}>
      <View style={styles.cantainer}>
        <Text style={styles.headerTxt}>WELCOME</Text>

        <View style={styles.subView}>
          <Text style={styles.subTxt}>{t('Signup')}</Text>
          <TextInput
            style={styles.nameInput}
            placeholder={t('Enter Your Name')}
            onChangeText={val => handleChange('name', val)}
          />
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
          <TextInput
            style={styles.nameInput}
            secureTextEntry={true}
            placeholder={t('Confirm Password')}
            onChangeText={val => handleChange('confirmPass', val)}
          />
          <TouchableOpacity style={styles.btn} onPress={isRegister}>
            <Text style={styles.btnTxt}>{t('Signup')}</Text>
          </TouchableOpacity>
          <View style={styles.endView}>
            <Text style={styles.endTxt}> {t('Already have an account')}</Text>
            <TouchableOpacity
              style={styles.endBtn}
              onPress={() => navigation.navigate(LOGIN_ROUTE)}>
              <Text style={styles.loginTxt}>{t('Login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  cantainer: {
    // width,
    backgroundColor: '#7051d6',
    // height: 700,
    flex: 1,
  },
  subView: {
    backgroundColor: 'white',
    height: 500,
    marginTop: 170,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: 60,
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
    borderRadius: 60,
    // borderWidth: 1,
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
    borderRadius: 10,
    backgroundColor: 'white',
  },
  endTxt: {
    fontSize: 17,
    marginTop: 15,
    marginLeft: 30,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 70,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:'#2da7ee'
  },
});
export default SignInPage;
