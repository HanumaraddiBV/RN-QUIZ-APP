import { USERS_API } from "../components/constatnts/constants";
import * as actionTypes from "./ActionTypes";
const axios = require("axios");

export const addUserDetails = (payload) => {
  console.log("payload:", payload);
  return {
    type: actionTypes.ADD_USER_DETAILS,
    payload: payload,
  };
};

export const isAnswered = (payload) => {
  return {
    type: actionTypes.ANSWER,
    payload,
  };
};

export const isUserIsLogIn = (payload) => {
  return {
    type: actionTypes.USER_LOGIN,
    payload,
  };
};
export const answereIsWrong = (payload) => {
  return {
    type: actionTypes.WRONG_ANSWER,
    payload,
  };
};

export const isUserSignOut = () => {
  return {
    type: actionTypes.SIGN_OUT,
    value: null,
  };
};

export const addResultToProgressArr = (payload) => {
  return {
    type: actionTypes.ADD_RESULT,
    payload,
  };
};

export const updateResultAgainEmpty = () => {
  return {
    type: actionTypes.UPDATE_RESULT,
  };
};

export const updatedProgressReport = (payload) => (dispatch) => {
  axios
    .patch(`${USERS_API}/${payload.userId.userDetails.id}`, {
      report: payload.quizResultInfo,
    })
    .then((resp) => {
      console.log("res", resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const addQuestionToDatabase = (payload, categoryTitle) => {
//   axios
//     .patch(`http://localhost:3001/questionData?category=${categoryTitle}`, {
//       questions: [...payload],
//     })
//     .then((res) => {
//       console.log("res:", res.data);
//       let payloadData = res.data;
//       console.log("payloadData:", payloadData);
//       // handleQuestions(payloadData)
//     })
//     .catch((err) => {
//       console.log("err:", err);
//     });
  
// };

// export const handleQuestions = (payload)=>{
//   return {
//     type: actionTypes.ADD_QUESTIONS,
//     payload,
//   };
// }
