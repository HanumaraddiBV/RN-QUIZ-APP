import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducer";
import logger from "redux-logger";
import { resultReducer } from "./resultReducer";
const thunk = require("redux-thunk").default;

const quizAppReducers = combineReducers({
  userInfo: userReducer,
  userProgressInfo: resultReducer,
});
export const Store = createStore(
  quizAppReducers,
  applyMiddleware(thunk, logger)
);
