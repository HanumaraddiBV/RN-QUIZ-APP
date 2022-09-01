import 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n/I18n';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './src/Navigation/DrawerNavigation/DrawerNavigation';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <I18nextProvider i18n={i18n}>
        <View style={styles.container}>
          <LinearGradient
            // Background Linear Gradient
            colors={['#a4d4ff', '#5f8cff']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.background}
          >
          <DrawerNavigation/>
       
          </LinearGradient>
        </View>
      </I18nextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
    height: 1000,
  },
});
