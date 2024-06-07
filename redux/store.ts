import { combineReducers, createStore } from "redux";
import airbnbDataReducer from "./reducers/airbnbDataReducer";

export interface RootState {
  airbnbDataReducer: any;
}

const rootReducer = combineReducers({
  airbnbDataReducer,
});

const store = createStore(rootReducer);

export default store;
