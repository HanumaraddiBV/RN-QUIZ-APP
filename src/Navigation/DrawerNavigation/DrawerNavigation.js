import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../Screens/Home/Home';
import Login from '../../Screens/Login/Login';
import SignInPage from '../../Screens/SignUp/SignInPage';
import CategoryItem from '../../Screens/CategoryList/CategoryItem';
import {Quiz} from '../../Screens/Quiz/Quiz';
import MainStackNavigator from '../StackNavigation/MainStackNavigator';
import Result from '../../Screens/Results/Result';
import ProgressPage from '../../Screens/ProgressPage/ProgressPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect, useSelector} from 'react-redux';
import adminAuth from '../../Screens/AdminPage/adminAuth';
import UserProfile from '../../Screens/Profile/UserProfile';
import {
  ADMIN_ROUTE,
  CATEGORY_ROUTE,
  PROFILE_ROUTE,
  REPORT_ROUTE,
} from '../../components/constatnts/constants';
import AboutUs from '../../Screens/AboutUs/AboutUs';

const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const {userDetails} = useSelector(store => store.userInfo);
  // console.log('userDetails:', userDetails);
  //destructuring the email and password from userDetails
  const {email, password} = userDetails;
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'none',
      }}>
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon name="home" size={24} color={focused ? '#e91e63' : 'black'} />
          ),
        }}
      />

      <Drawer.Screen
        name={PROFILE_ROUTE}
        component={UserProfile}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon name="user" size={25} color={focused ? '#e91e63' : 'black'} />
          ),
        }}
      />
      <Drawer.Screen
        name={CATEGORY_ROUTE}
        component={CategoryItem}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name="list-ul"
              size={23}
              color={focused ? '#e91e63' : 'black'}
            />
          ),
        }}
      />
      {/* <Drawer.Screen name="Result" component={Result} /> */}
      <Drawer.Screen
        name={REPORT_ROUTE}
        component={ProgressPage}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon name="book" size={24} color={focused ? '#e91e63' : 'black'} />
          ),
        }}
      />
      <Drawer.Screen
        name={email ? 'Logout' : 'Login'}
        component={Login}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name="user-circle"
              size={24}
              color={focused ? '#e91e63' : 'black'}
            />
          ),
        }}
      />
      {email == 'admin@admin.com' && password == 'Admin@123' ? (
        <Drawer.Screen
          name={ADMIN_ROUTE}
          component={adminAuth}
          options={{
            drawerIcon: ({focused}) => (
              <Icon
                name="user-circle"
                size={24}
                color={focused ? '#e91e63' : 'black'}
              />
            ),
          }}
        />
      ) : null}
      <Drawer.Screen
        name="About"
        component={AboutUs}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name="info-circle"
              size={26}
              color={focused ? '#e91e63' : 'black'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
