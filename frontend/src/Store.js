import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getInfosReducer, updateInfosReducer } from "./4-reducers/infoReducers";

const reducer = combineReducers({
  updateInfos: updateInfosReducer,
  getInfos: getInfosReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhancer(applyMiddleware(thunk)));
export default store;
