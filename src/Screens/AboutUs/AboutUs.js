import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {Avatar} from 'react-native-paper';
import {SocialIcon} from '@rneui/themed';

export default class AboutUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Avatar.Image
              size={150}
              source={require('../../../Assets/Profile.jpeg')}
            />
            <Text style={{fontSize: 26, color: 'white', fontWeight: '800'}}>
              Hanumaraddi Vaddatti
            </Text>
            <Text style={{fontSize: 18, color: 'white', fontWeight: '500'}}>
              Full Stack Web and Android Developer
            </Text>
            <Text style={{fontSize: 17, color: 'grey', fontWeight: '500'}}>
              Softaware Trainee @Clayfin, chennai
            </Text>
          </View>
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.aboutme}>
            <Text style={{fontSize: 26, color: 'grey', fontWeight: '800'}}>
              About Me
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#044203',
                fontWeight: '400',
                textAlign: 'justify',
                lineHeight: 22,
              }}>
              I'm a Full Stack Web and Android developer with a great passion
              for coding and problem solving. I am creative thinker and like to
              solve challenging real life problems with the power of coding. I
              am familiar with building the websites with HTML, CSS, React for
              Front-end & Node Express awarness for Backend. I like to do
              project which includes problem solving as it helps me to learn. I
              am agile to learn new stacks.
            </Text>
          </View>
          <View style={styles.contact}>
            <Text style={styles.mainHeader}> Follow me on Social Network </Text>

            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  Linking.openURL(
                    'https://instagram.com/reddy_kh14?igshid=YmMyMTA2M2Y=',
                  )
                }>
                <SocialIcon light type="instagram" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  Linking.openURL(
                    'https://www.linkedin.com/in/hanumaraddi-vaddatti/',
                  )
                }>
                <SocialIcon light type="linkedin" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  Linking.openURL('https://github.com/HanumaraddiBV')
                }>
                <SocialIcon light type="github" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  Linking.openURL(
                    'https://www.facebook.com/profile.php?id=100005778317632',
                  )
                }>
                <SocialIcon light type="facebook" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#7051d6',
    borderBottomRightRadius: 70,
    // position: 'absolute',
  },
  contactContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileDetails: {
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'white',
    position: 'relative',
    top: 60,
    padding: 10,
    justifyContent: 'space-evenly',
    height: '80%',
  },
  aboutme: {
    flex: 1.3,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  mainHeader: {
    fontSize: 18,
    color: '#344055',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'JosefinSans_700Bold',
  },
  paraStyle: {
    fontSize: 18,
    color: '#7d7d7d',
    paddingBottom: 30,
  },
  aboutLayout: {
    backgroundColor: '#4c5dab',
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginVertical: 15,
    fontFamily: 'JosefinSans_700Bold',
    alignSelf: 'center',
  },
  aboutPara: {
    color: '#fff',
  },
  menuContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  iconStyle: {
    width: '100%',
    height: 50,
    aspectRatio: 1,
  },
  contact: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
