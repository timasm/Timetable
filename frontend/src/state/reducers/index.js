import { combineReducers } from "redux";
import reducerShift from "./reducerShift";
import reducerInfo from "./reducerInfo";
import reducerBool from "./reducerBool";

const reducers = combineReducers({
   shift: reducerShift,
   info: reducerInfo,
   bool: reducerBool,
});

export default reducers;
