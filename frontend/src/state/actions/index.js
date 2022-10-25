/**
 * Shift Reducer
 */

export const setDay = (day) => {
   return (dispatch) => {
      dispatch({
         type: "SET_DAY",
         day: day,
      });
   };
};

export const setShiftSchedule = (shiftSchedule) => {
   return (dispatch) => {
      dispatch({
         type: "SET_SHIFT_SCHEDULE",
         shiftSchedule: shiftSchedule,
      });
   };
};

export const setEmployees = (employees) => {
   return (dispatch) => {
      dispatch({
         type: "SET_EMPLOYEES",
         employees: employees,
      });
   };
};

/**
 * Bool Reducer
 */

export const setLogin = (login) => {
   return (dispatch) => {
      dispatch({
         type: "SET_LOGIN",
         login: login,
      });
   };
};

/**
 * Info Reducer
 */

export const setInitState = (initState) => {
   return (dispatch) => {
      dispatch({
         type: "SET_INIT_STATE",
         initState: initState,
      });
   };
};

export const setToken = (token) => {
   return (dispatch) => {
      dispatch({
         type: "SET_TOKEN",
         token: token,
      });
   };
};

export const setUserInfo = (userInfo) => {
   return (dispatch) => {
      dispatch({
         type: "SET_USER_INFO",
         userInfo: userInfo,
      });
   };
};
