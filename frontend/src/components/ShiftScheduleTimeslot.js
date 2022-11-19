import React from "react";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ShiftScheduleSlotItem from "./ShiftScheduleSlotItem";

import "../scss/shift-schedule.scss";

const NameMap = ({ names }) => {
   return (
      <>
         {names.map((name, index) => {
            return (
               <ShiftScheduleSlotItem
                  key={index}
                  name={name}
                  role={"Theke"}
               ></ShiftScheduleSlotItem>
            );
         })}
      </>
   );
};

const ShiftScheduleTimeslot = ({ time, height, index }) => {
   const employees = useSelector((state) => state.shift.employees);
   const shiftSchedule = useSelector((state) => state.shift.shiftSchedule);

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

            {shiftSchedule.map((day, shiftIdx) => {
               var names = [];
               employees.forEach((emp) => {
                  day[time].forEach((empSlot) => {
                     if (emp.id === empSlot)
                        names.push(`${emp.firstname} ${emp.lastname}`);
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
