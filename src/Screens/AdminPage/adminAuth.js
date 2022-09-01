import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from 'axios';
import {Alert, Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {withTranslation} from 'react-i18next';
const {width} = Dimensions.get('window');
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ADMIN_API} from '../../components/constatnts/constants';
class adminAuth extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: '',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      categoryOptions: ['React', 'Javascript', 'Java'],
      questionsList: [],
    };
  }
  //setting the states
  handleChange = (key, val) => {
    this.setState({...this.state, [key]: val}, () => {
      console.log('state', this.state);
    });
  };
  componentDidMount() {}
  formSubmitHandler = () => {
    // console.log(this.state)
    let obj = {
      question: this.state.question,
      options: [
        this.state.optionA,
        this.state.optionB,
        this.state.optionC,
        this.state.optionD,
      ],
      answer: this.state.correctAnswer,
    };
    axios
      .get(`${ADMIN_API}?category=${this.state.categoryName}`)
      .then(res => {
        let questionslistData = res.data;
        console.log('questionslistData:', questionslistData[0].questions);

        this.setState(
          {
            ...this.state,
            questionslist: [...questionslistData[0].questions, obj],
          },
          () => {
            console.log('this.state.questionslist:', this.state.questionslist);
            // this.props.addQuestion(
            //   this.state.questionslist,
            //   this.state.categoryName
            // );
            this.handleDatabase(this.state.questionslist);
          },
        );

        // console.log(this.state)
      })
      .catch(err => {
        console.log('err:', err);
      });
  };
  handleDatabase = payload => {
    let id;
    if (this.state.categoryName == 'React') {
      id = 1;
    } else if (this.state.categoryName == 'Javascript') {
      id = 2;
    } else {
      id = 3;
    }
    axios
      .patch(`${ADMIN_API}/${id}`, {
        category: this.state.categoryName,
        questions: payload,
      })
      .then(res => {
        let payloadData = res.data;
        console.log('payloadData:', payloadData);
        Alert.alert('You are successfully added question to the database');
        // handleQuestions(payloadData)
      })
      .catch(err => {
        console.log('errrrr:', err);
      });
  };
  render() {
    const {t} = this.props;

    return (
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 150}}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={180}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Hello!, Admin You have full control of this application.
          </Text>

          <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
            Add questions according to category{' '}
          </Text>
          <View style={styles.mainAdmin}>
            {/* <form onSubmit={this.formSubmitHandler}> */}
            <SelectDropdown
              data={this.state.categoryOptions}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                this.setState({
                  ...this.state,
                  categoryName: selectedItem,
                });
              }}
              defaultButtonText={'Select category Name'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />

            <TextInput
              label="Question"
              value={this.state.question}
              placeholder={'Enter the question description'}
              onChangeText={val => this.handleChange('question', val)}
              mode="outlined"
            />

            <TextInput
              label="Option A"
              value={this.state.optionA}
              placeholder={t('Enter Option A')}
              onChangeText={val => this.handleChange('optionA', val)}
              mode="outlined"
            />

            <TextInput
              label="Option B"
              value={this.state.optionB}
              placeholder={t('Enter Option B')}
              onChangeText={val => this.handleChange('optionB', val)}
              mode="outlined"
            />

            <TextInput
              label="Option C"
              value={this.state.optionC}
              placeholder={t('Enter Option C')}
              onChangeText={val => this.handleChange('optionC', val)}
              mode="outlined"
            />

            <TextInput
              label="Option D"
              value={this.state.optionD}
              placeholder={t('Enter Option D')}
              onChangeText={val => this.handleChange('optionD', val)}
              mode="outlined"
            />

            <TextInput
              label="Correct Answer"
              value={this.state.correctAnswer}
              placeholder={t('Enter correct Answer')}
              onChangeText={val => this.handleChange('correctAnswer', val)}
              mode="outlined"
            />

            <Pressable
              style={styles.result_footer}
              onPressIn={() => {
                this.formSubmitHandler();
              }}>
              <Text style={styles.textStyle}> Submit</Text>
            </Pressable>
            {/* </form> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.userInfo.userDetails.email,
    userPassword: state.userInfo.userDetails.password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // addQuestion: (payload, categoryTitle) =>
    //   dispatch(addQuestionToDatabase(payload, categoryTitle)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(adminAuth));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'space-evenly',
  },
  mainAdmin: {
    borderWidth: 1,
    width: width / 1.1,
    marginTop: 10,
    padding: 10,
    // justifyContent:'space-evenly',
    // height:"79%"
    borderColor:'grey'
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  result_footer: {
    position: 'relative',
    width: '40%',
    backgroundColor: '#8b80b6',
    height: '9.5%',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#4b6ab9',
    textAlign: 'left',
    marginTop: 30,
    lineHeight: 47,
    marginLeft: 25,
  },
});
