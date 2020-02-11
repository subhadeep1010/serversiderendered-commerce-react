import { combineReducers } from "redux";
// import authReducer from "./authReducer";
// import errorReducer from "./errorReducer";
// import tempRegReducer from "./tempRegReducer";
// import profileReducer from "./profileReducer";
// import modalReducer from "./modalReducer";
// import friendReducer from "./friendReducer";
// import postReducer from "./postReducer";
import productReducer from './productReducer';

export default combineReducers({
  // auth: authReducer,
  // errors: errorReducer,
  // initialReg: tempRegReducer,
  // profile: profileReducer,
  // modal: modalReducer,
  // friends_info: friendReducer,
  // posts: postReducer
  products: productReducer
});
