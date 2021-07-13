import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getInfosReducer, updateInfosReducer } from "./4-reducers/infoReducers";
import {
  addItemReducer,
  deleteFileReducer,
  deleteItemReducer,
  getFiltersReducer,
  getItemsReducer,
  updateItemReducer,
} from "./4-reducers/itemReducers";
import {
  passwordResetReducer,
  userGetReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./4-reducers/userReducers";

const reducer = combineReducers({
  updateInfos: updateInfosReducer,
  getInfos: getInfosReducer,
  getItem: getItemsReducer,
  addItem: addItemReducer,
  updateItem: updateItemReducer,
  deleteItem: deleteItemReducer,
  getFilters: getFiltersReducer,
  deleteFile: deleteFileReducer,
  loginUser: userLoginReducer,
  registerUser: userRegisterReducer,
  getUser: userGetReducer,
  updateUser: userUpdateReducer,
  passwordReset: passwordResetReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhancer(applyMiddleware(thunk)));
export default store;
