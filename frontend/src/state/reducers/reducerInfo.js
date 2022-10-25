const SET_INIT_STATE = "SET_INIT_STATE";
const SET_TOKEN = "SET_TOKEN";
const SET_USER_INFO = "SET_USER_INFO";

const initState = "Hello World";
const token = "";
const userInfo = {};

const reducer = (state = { initState, token, userInfo }, action) => {
   switch (action.type) {
      case SET_INIT_STATE:
         return {
            ...state,
            initState: action.initState,
         };
      case SET_TOKEN:
         return {
            ...state,
            token: action.token,
         };
      case SET_USER_INFO:
         return {
            ...state,
            userInfo: action.userInfo,
         };
      default:
         return state;
   }
};

export default reducer;
