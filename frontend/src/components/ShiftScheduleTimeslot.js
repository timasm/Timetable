import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "../scss/shift-schedule.scss";

const ShiftScheduleTimeslot = ({ data, height, index }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: `${height}%`,
          marginTop: "0.6%",
          display: "flex",
          alignItems: "center",
          padding: 0,
        }}
      >
        <Typography
          sx={{
            width: "14%",
            height: "70%",
            borderRight: "1px solid lightgray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="h6"
          color="inherit"
          component="div"
        >
          {data.slotTime}
        </Typography>
        <div id={`emp-1-${index}`} className="employee-in-timeslot"></div>
        <div id={`emp-2-${index}`} className="employee-in-timeslot"></div>
        <div id={`emp-3-${index}`} className="employee-in-timeslot"></div>
        <div id={`emp-4-${index}`} className="employee-in-timeslot"></div>
        <div id={`emp-5-${index}`} className="employee-in-timeslot"></div>
      </Box>
    </>
  );
};

export default ShiftScheduleTimeslot;
