import React, {Component} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';

import {
  CATEGORY_ROUTE,
  HOME_ROUTE,
  LINK_STYLE,
  REPORT_ROUTE,
} from '../../components/constatnts/constants';
import {
  addResultToProgressArr,
  updatedProgressReport,
  updateResultAgainEmpty,
} from '../../Redux/Actions';
import WavyHeader from './WavyHeader';
import LottieView from 'lottie-react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
class Result extends Component {
  componentDidMount() {
    this.props.handleResult({
      userId: this.props.userId,
      result: this.props.result,
      totalScore: this.props.totalScore,
      categoryName: this.props.categoryName,
      quizResultInfo: this.props.quizResultInfo,
    });
  }
  componentWillUnmount() {}
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <WavyHeader customStyles={styles.svgCurve} />
          <View style={styles.LotteView}>
            <LottieView
              source={require('../../lotteAnimations/ResultAnime.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Congragulations!</Text>
          </View>
          <Text style={styles.centerText}>
            Score : {this.props.totalScore}/50
          </Text>
          <CircularProgress
            value={(this.props.totalScore / 50) * 100}
            inActiveStrokeColor={'#2ecc71'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'black'}
            valueSuffix={'%'}
            radius={100}
          />
          <View style={styles.result_container}>
            <Pressable
              style={styles.result_footer}
              onPress={() => {
                this.props.toUpdateResultToEmpty();
                this.props.navigation.navigate(HOME_ROUTE);
              }}>
              <Text style={styles.textStyle}> Exit </Text>
            </Pressable>

            <Pressable
              style={styles.result_footer}
              onPressIn={() => {
                this.props.toUpdateResultToEmpty();
                this.props.navigation.navigate(REPORT_ROUTE);
              }}>
              <Text style={styles.textStyle}> Report</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
    handleResult: payload => dispatch(updatedProgressReport(payload)),
    toUpdateResultToEmpty: () => dispatch(updateResultAgainEmpty()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Result);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    // change the color property for better output
    color: 'grey',
    textAlign: 'center',
  },
  LotteView: {
    position: 'relative',
    width: '80%',
    height: 300,
    // backgroundColor: 'white',

    // marginTop: 100,
    // right: 10,
    // left: 20,
    // elevation:50,
    shadowColor: '#0078AA',
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 30,
  },
  centerText: {
    marginTop: 20,
    // justifyContent:'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  result_container: {
    flexDirection: 'row',
    // borderWidth:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 400,
    height: 70,
  },
  result_footer: {
    position: 'relative',
    width: '40%',
    backgroundColor: '#8b80b6',
    height: '80%',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
