import {
  Dimensions,
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('window');

import WavyHeader from './WavyHeader';
import {withTranslation} from 'react-i18next';
import { CATEGORY_ROUTE } from '../../components/constatnts/constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: true};
  }
  handleClick = () => {
    this.props.navigation.navigate(CATEGORY_ROUTE);
  };
  Hide_Splash_Screen = () => {
    this.setState({isVisible: false});
  };
  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 2000);
  }

  render() {
    const {t} = this.props;
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={{
              uri: 'https://play-lh.googleusercontent.com/-dGSUTdes6YTUtZfrtFfTsRPiIMCB8e2ykbhXDCg36qnvxdG_B6G51tNlvm66nPNrg',
            }}
            style={{width: '50%', height: '140%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
    return (
      <ScrollView
        style={
          this.state.isVisible === true ? {backgroundColor: 'black'} : null
        }>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          <WavyHeader customStyles={styles.svgCurve} />
          <View style={styles.headerContainer}>
            <Text
              style={[
                styles.headerText,
                {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
              ]}>
              {t('welcome')}
            </Text>
          </View>

          <View style={styles.LotteView}>
            <LottieView
              source={require('../../lotteAnimations/quizHomeAnime.json')}
              autoPlay
              loop
            />
          </View>

          <TouchableOpacity onPress={this.handleClick} style={styles.button}>
            <Text style={styles.buttonText}> {t('Play')}</Text>
          </TouchableOpacity>
        </View>
        {this.state.isVisible === true ? Splash_Screen : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LotteView: {
    position: 'relative',
    width: '80%',
    height: 300,

    marginTop: 70,

    shadowColor: '#0078AA',
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 30,
  },

  homeViewImage: {},
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  button: {
    width: '50%',
    backgroundColor: '#1A759F',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 90,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  HeaderTitle: {
    backgroundColor: '#521be4',
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#fff',
    textAlign: 'left',
    marginTop: 35,
    lineHeight: 47,
    marginLeft: 30,
  },
  SplashScreen_RootView: {
    justifyContent: 'center',

    // margin: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
export default withTranslation()(Home);
