import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  ADMIN_API,
  LINK_STYLE,
  RESULT_ROUTE,
} from '../../components/constatnts/constants';
import {questionDatas} from '../../Data/Questions';
import {
  addResultToProgressArr,
  answereIsWrong,
  isAnswered,
  updatedProgressReport,
} from '../../Redux/Actions';
const width = Dimensions.get('window').width;
import CircularProgress from 'react-native-circular-progress-indicator';

export const Quiz = ({route, navigation}) => {
  const {categoryName, totalScore, result, userDetails} = useSelector(
    store => store.userInfo,
  );

  const dispatch = useDispatch();
  //keep record of question number
  const [quesNum, setQuesNum] = useState(0);

  const [questionData, setQuestionData] = useState(questionDatas);
  useEffect(() => {
    axios
      .get(`${ADMIN_API}`)
      .then(res => {
        let allList = res.data;
        // console.log("allList:", allList);
        setQuestionData(allList);
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, []);
  const timeRef = useRef();
  //creating state for timer
  const [timer, setTimer] = useState(15);
  //extracting category name from useHistory hook
  // const history = useHistory();
  // console.log("history:", history.location.pathname.split("/")[2]);
  //to keep the selected option
  const [selected, setSelected] = useState();

  // to disabled the options once user selected
  const [disableOption, setDisableOption] = useState(false);

  //disabled the button after the all question are dusplayed
  const [nxtDisable, setNxtDisable] = useState(true);
  //with help of useParam hook getting the particular category from the url

  const category = route.params.category;
  // console.log(category);
  // const {category} = useParams();

  //matching the category with the data
  // console.log("questionData:", questionData);
  const quizCategory = questionData.find(item => item.category === category);

  // according to the question number getting the correct answer
  const correctAnswer = quizCategory.questions[quesNum].answer;

  const optionHandler = (option, questionDescription) => {
    //updateding the selected state to this option
    setSelected(option);
    //disabling the other option once user selected one option
    setDisableOption(true);
    //next button will visible
    setNxtDisable(false);

    //checking the condition where the user selected option and correct answer are both same or not?
    if (option === correctAnswer) {
      //dispatching the action and payload according to the condition
      dispatch(
        isAnswered({
          result: {
            correctAns: correctAnswer,
            selectedOption: option,
            questionDescription,
          },
          totalScore: 10,
          categoryName: category,
        }),
      );
    } else {
      dispatch(
        answereIsWrong({
          result: {
            correctAns: correctAnswer,
            selectedOption: option,
            questionDescription,
          },
          totalScore: 0,
          categoryName: category,
        }),
      );
    }
  };

  let intervalId;
  const timerFunc = () => {
    setTimer(prevCounter => prevCounter - 1);
    if (timer <= 0) {
      console.log('timer`111:', timer);

      nextHandler();
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    intervalId = setInterval(timerFunc, 1000);

    return () => clearInterval(intervalId);
  }, []);
  console.log('timer:', timer);
  console.log('quesNum:', quesNum);
  const nextHandler = () => {
    clearInterval(intervalId);
    if (quesNum < 4) {
      setQuesNum(quesNum + 1);
    }

    setDisableOption(false);
    setNxtDisable(true);
    setTimer(15);
  };

  if (timer <= 0) {
    nextHandler();
    clearInterval(intervalId);
  }
  if (quesNum == 4) {
    console.log('timer`111:', timer);

    // nextHandler();
    clearInterval(intervalId);
  }
  const addResultToState = () => {
    dispatch(addResultToProgressArr({categoryName, totalScore, result}));
    navigation.navigate(RESULT_ROUTE);
  };
  const {email} = userDetails;
  // console.log(email);
  return (
    <View style={styles.quiz_container}>
      <View style={styles.quiz_header}>
        <Text style={styles.quiz_question_count}>{`Question: ${
          quesNum + 1
        }/5`}</Text>

        <Text style={styles.quiz_score}>{`Timer: ${
          timer >= 0 ? timer : '00'
        }`}</Text>
      </View>
      <View>
        <Text style={styles.quiz_question}>
          {' '}
          {quesNum + 1}. {quizCategory.questions[quesNum].question}
        </Text>
      </View>
      <View style={styles.quiz_options}>
        {quizCategory.questions[quesNum].options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() =>
                optionHandler(item, quizCategory.questions[quesNum].question)
              }
              disabled={disableOption}
              style={[
                styles.selectOptBtn,
                selected === item ? styles.sel_option : '',
              ]}>
              <Text style={styles.selectOptBtnText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.quiz_footer}>
        {quesNum === 4 ? (
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={nxtDisable}
            onPress={addResultToState}
            style={styles.quiz_footerBtn}>
            <Text style={styles.textStyle}> Result</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={nxtDisable} onPress={nextHandler}>
            <Text style={styles.textStyle}> Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quiz_container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  quiz_header: {
    flexDirection: 'row',

    alignItems: 'center',
    // borderWidth: 1,
    width,
    height: 70,
    justifyContent: 'space-between',
    padding: 20,
  },
  quiz_question_count: {
    color: '#ecae53',
    fontSize: 20,
    fontWeight: '600',
  },
  quiz_score: {
    color: '#ecae53',
    fontSize: 20,
    fontWeight: '600',
  },
  quiz_question: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
    padding: 6,
    textAlign: 'justify',
    lineHeight: 30,
    alignSelf: 'flex-start',
  },
  quiz_options: {
    // borderWidth: 1,
    width: width,
    marginTop: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectOptBtn: {
    // borderWidth:1,
    elevation: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: width * 0.9,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  selectOptBtnText: {
    color: '#424a5d',
    fontSize: 20,
    fontWeight: '500',
  },
  quiz_footer: {
    // borderWidth: 1,
    width: width * 0.4,
    height: 70,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#8b80b6',
  },
  quiz_footerBtn: {
    position: 'relative',
    width: '100%',
    // backgroundColor: '#8b80b6',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  sel_option: {
    backgroundColor: '#e7c6ff',
  },
});
