const SET_LOGIN = "SET_LOGIN";

const login = false;

const reducer = (state = { login }, action) => {
   switch (action.type) {
      case SET_LOGIN:
         return {
            ...state,
            login: action.login,
         };
      default:
         return state;
   }
};

export default reducer;
