import axios from 'axios';
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
  Dimensions,
  Alert,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNMail from 'react-native-mail';

import {Table, TableWrapper, Row} from 'react-native-table-component';
import {HOME_ROUTE, USERS_API} from '../../components/constatnts/constants';
import WavyHeader from './WavyHeader';
const width = Dimensions.get('window').width;
class ProgressPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userReport: null,
      isView: false,
      tableHead: ['Serial Number', 'Category Name', 'Total Score'],
      widthArr: [70, 150, 150],
      tableData: null,
      data: [],
      pdfSource: '',
    };
    this.pdfRef = React.createRef();
  }

  componentDidMount() {
    axios
      .get(`${USERS_API}/${this.props.userId.id}`)
      .then(res => {
        let userProgressData = res.data;
        // this.setState({ ...this.state, userReport: userProgressData });
        console.log('userProgressData:', userProgressData);
        const scores = [];
        for (let i = 0; i < userProgressData.report.length; i++) {
          scores.push([
            i + 1,
            userProgressData.report[i].categoryName,
            userProgressData.report[i].totalScore,
          ]);
        }
        if (userProgressData.report.length > 0) {
          this.setState(
            {
              ...this.state,
              userReport: [...scores],
            },
            () => {
              console.log('dd', this.state.userReport);
            },
          );
        } else {
          this.setState({...this.state, userReport: this.props.userId});
        }
      })
      .catch(err => {
        console.log('err:', err);
      });
  }

  async createPDF(html) {
    let options = {
      html,
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    // alert(file.filePath);
    this.setState({...this.state, pdfSource: file.filePath}, () => {
      this.props.navigation.navigate('Pdf', {path: this.state.pdfSource});
    });
    console.log(file.filePath);
  }

  //for sending mail
  handleEmail = () => {
    RNMail.mail(
      {
        subject: 'Progress Report',
        recipients: [this.props.userId.email],
        // ccRecipients: ['supportCC@example.com'],
        // bccRecipients: ['supportBCC@example.com'],
        body: 'Please check the attachment that is your progress report',

        attachmentPath: this.state.pdfSource,
        attachmentType: 'pdf',
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };
  componentWillUnmount() {
    this.props.navigation.navigate(HOME_ROUTE);
  }
  render() {
    const generateHTML = (num, cat, score) =>
      ` <div>
      <h1>Hello ${this.props.userId.name} this your Progress report</h1>
      <table >
        <thead>
          <tr>
          <th>Question</th>
            <th>Category Name</th>

            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>

            <tr>
              <td>${num}</td>
              <td>
                ${cat}
              </td>
            
              
              <td>${score}</td>
            </tr>
       
        </tbody>
      </table>
    </div>`;
    var html;
    {
      this.state.userReport == null ? (
        <Text>Loading..</Text>
      ) : (
        this.state.userReport.map(ele => {
          const [num, cat, score] = ele;
          console.log(num);
          html = generateHTML(num, cat, score);
        })
      );
    }
    return (
      <ScrollView>
        <View style={styles.container} ref={this.pdfRef}>
          <View style={styles.headerContainer}>
            <WavyHeader customStyles={styles.svgCurve} />
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.headerText,
                  {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
                ]}>
                Hello, {this.props.userId.name} You can check your progress
                report on below Table
              </Text>
            </View>
          </View>
          <View style={styles.pdfButtons}>
            <TouchableOpacity
              onPress={() => this.createPDF(html)}
              style={styles.button}>
              <Text style={styles.buttonText}>View as Pdf</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleEmail} style={styles.button}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            ref={this.pdfRef}
            style={styles.tableContainer}>
            <View>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row
                  data={this.state.tableHead}
                  widthArr={this.state.widthArr}
                  style={styles.head}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                  {this.state.userReport?.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={this.state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && {backgroundColor: '#ffffff'},
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log('state:', state);
  return {
    userId: state.userInfo.userDetails,
    result: state.userInfo.result,
    totalScore: state.userInfo.totalScore,
    categoryName: state.userInfo.categoryName,
    quizResultInfo: state.userProgressInfo.progressData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // printPdf: ()=> print()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // paddingTop: 30,
    // backgroundColor: '#7051d6',
  },
  head: {
    height: 50,
    backgroundColor: '#6F7BD9',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
  button: {
    width: '40%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fa6721',
    textAlign: 'center',
  },
  svgCurve: {
    position: 'absolute',
    width: width,
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
  tableContainer: {
    position: 'relative',
    marginTop: 50,
    width: width / 1.1,
    borderWidth: 1,
    // justifyContent:'center',
    // alignContent:'center'
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: -10,

    borderColor: 'grey',
    height: 300,
  },
  pdfButtons: {
    position: 'relative',
    flexDirection: 'row',
    // borderWidth:1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
  },
});
