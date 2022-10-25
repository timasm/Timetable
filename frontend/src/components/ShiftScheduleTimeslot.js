import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "../scss/shift-schedule.scss";

const NameMap = ({ names }) => {
  return (
    <div>
      {names.map((name, index) => {
        return (
          <label key={index}>
            {name}
            <br></br>
          </label>
        );
      })}
    </div>
  );
};

const ShiftScheduleTimeslot = ({ shift, time, employees, height, index }) => {
  console.log(shift);
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
          {time}
        </Typography>

        {shift.map((day, shiftIdx) => {
          var names = [];
          employees.forEach((emp) => {
            day[time].map((empSlot) => {
              if (emp.key === empSlot) names.push(emp.firstname);
            });
          });

          return (
            <Droppable
              key={`${index}-${shiftIdx}`}
              droppableId={`time-slot-${index}-${shiftIdx}`}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  id={`emp-${shiftIdx}-${index}`}
                  className="employee-in-timeslot"
                >
                  {provided.placeholder}
                  <NameMap names={names}></NameMap>
                </div>
              )}
            </Droppable>
          );
        })}
      </Box>
    </>
  );
};

export default ShiftScheduleTimeslot;
