import {View, Text} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import Login from '../../Screens/Login/Login';
import SignInPage from '../../Screens/SignUp/SignInPage';
import CategoryItem from '../../Screens/CategoryList/CategoryItem';
import {Quiz} from '../../Screens/Quiz/Quiz';
import Result from '../../Screens/Results/Result';
import ProgressPage from '../../Screens/ProgressPage/ProgressPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import PdfView from '../../Screens/ProgressPage/PdfView';
import { CATEGORY_ROUTE, HOME_ROUTE, LOGIN_ROUTE, QUIZ_ROUTE, RESULT_ROUTE, SIGNUP_ROUTE } from '../../components/constatnts/constants';

const Stack = createStackNavigator();
export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'none',
      }}>
      <Stack.Screen name={HOME_ROUTE} component={Home} />
      <Stack.Screen name={LOGIN_ROUTE} component={Login} />
      <Stack.Screen name={SIGNUP_ROUTE} component={SignInPage} />
      <Stack.Screen name={CATEGORY_ROUTE} component={CategoryItem} />
      <Stack.Screen name={QUIZ_ROUTE} component={Quiz} />
      <Stack.Screen name={RESULT_ROUTE} component={Result} />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBackImage: () => <Icon name='arrow-left' />,
        }}
        name="Report" component={ProgressPage}
      />
      <Stack.Screen name="Pdf" component={PdfView} />

    </Stack.Navigator>
  );
}
