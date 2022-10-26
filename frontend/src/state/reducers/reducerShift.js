const SET_DAY = "SET_DAY";
const SET_SHIFT_SCHEDULE = "SET_SHIFT_SCHEDULE";
const SET_EMPLOYEES = "SET_EMPLOYEES";

const day = [];

const shiftSchedule = [];

const employees = [
   {
      key: 1,
      firstname: "Max",
      lastname: "Mustermann",
      duration: 8,
   },
   {
      key: 2,
      firstname: "Marie",
      lastname: "Musterfrau",
      duration: 8,
   },
   {
      key: 3,
      firstname: "Florian",
      lastname: "Schroeter",
      duration: 6,
   },
   {
      key: 4,
      firstname: "Tim",
      lastname: "Assmann",
      duration: 4,
   },
];

const reducer = (state = { day, shiftSchedule, employees }, action) => {
   switch (action.type) {
      case SET_DAY:
         return {
            ...state,
            day: action.day,
         };
      case SET_SHIFT_SCHEDULE:
         return {
            ...state,
            shiftSchedule: action.shiftSchedule,
         };
      case SET_EMPLOYEES:
         return {
            ...state,
            employees: action.employees,
         };
      default:
         return state;
   }
};

export default reducer;
