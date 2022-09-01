import * as actionTypes from "./ActionTypes";
const init = {
  userDetails: {
    id:null,
    name: null,
    email: null,
    password: null,
  },
  result: [],
  totalScore: 0,
  categoryName:null,
};

export const userReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case actionTypes.ANSWER:
      return {
        ...state,
        result: [...state.result, action.payload.result],
        totalScore: state.totalScore + action.payload.totalScore,
        categoryName: action.payload.categoryName
      };
    case actionTypes.USER_LOGIN:
      if (state.userDetails.name == null) {
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
          },
        };
      } else {
        return state;
      }
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        userDetails: {
          name: action.value,
          email: action.value,
          password: action.value,
        },
        result: [],
        totalScore: 0,
      };
    case actionTypes.WRONG_ANSWER:
      return {
        ...state,
        result: [...state.result, action.payload.result],
        totalScore: state.totalScore + action.payload.totalScore,
        categoryName: action.payload.categoryName
      };

      case actionTypes.UPDATE_RESULT:
      return {
        ...state,
        result: [],
        totalScore: 0,
        categoryName: ''
      };
    default:
      return state;
  }
};
