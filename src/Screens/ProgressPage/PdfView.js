import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

export default function PdfView({route, navigation}) {
  const {path} = route.params;
  console.log('pdf', path);
  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: path}}
        onError={error => {
          console.log(error);
        }}
        // onPressLink={(uri) => {
        //   console.log(`Link presse: ${uri}`);
        // }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top:-70
  },
});
