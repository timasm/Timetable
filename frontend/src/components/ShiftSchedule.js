import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import "../scss/shift-schedule.scss";
import ShiftScheduleTopic from "./ShiftScheduleTopic";
import ShiftScheduleTimeslot from "./ShiftScheduleTimeslot";
import ShiftScheduleEmployee from "./ShiftScheduleEmployee";

const tempData = [
  {
    slotTime: "08:00 - 10:00",
    "08:00 - 10:00": [{ firstname: "Max", lastname: "Mustermann" }],
  },
  {
    slotTime: "10:00 - 12:00",
    "10:00 - 12:00": [{ firstname: "Max", lastname: "Mustermann" }],
  },
  {
    slotTime: "12:00 - 14:00",
    "12:00 - 14:00": [{ firstname: "Max", lastname: "Mustermann" }],
  },
  {
    slotTime: "16:00 - 18:00",
    "16:00 - 18:00": [{ firstname: "Max", lastname: "Mustermann" }],
  },
  /*
  { slotTime: "08:00 - 09:00" },
  { slotTime: "09:00 - 10:00" },
  { slotTime: "10:00 - 11:00" },
  { slotTime: "11:00 - 12:00" },
  { slotTime: "12:00 - 13:00" },
  { slotTime: "13:00 - 14:00" },
  { slotTime: "14:00 - 15:00" },
  { slotTime: "15:00 - 16:00" },
  { slotTime: "16:00 - 17:00" },*/
];

const tempEmployee = [
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
];

const ShiftSchedule = () => {
  return (
    <>
      <div>
        <Box
          sx={{ width: "85vw", height: "75vh", boxShadow: 3, borderRadius: 2 }}
        >
          <ShiftScheduleTopic></ShiftScheduleTopic>
          <div className="shift-content">
            <div className="shift-content-timetable">
              {tempData.map((slot, index) => {
                const height = 94 / tempData.length - 0.6;
                const lastElement = index === tempData.length - 1;
                return (
                  <div key={index} style={{ height: `${height}%` }}>
                    <ShiftScheduleTimeslot
                      data={slot}
                      height={100}
                      index={index}
                    ></ShiftScheduleTimeslot>
                    {lastElement ? <></> : <Divider sx={{ width: "100%" }} />}
                  </div>
                );
              })}
            </div>
            <div className="shift-content-employee">
              {tempEmployee.map((emp, index) => {
                const lastElement = index === tempData.length - 1;
                return (
                  <div key={index}>
                    <ShiftScheduleEmployee
                      employee={emp}
                    ></ShiftScheduleEmployee>
                    {lastElement ? <></> : <Divider sx={{ width: "100%" }} />}
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default ShiftSchedule;
