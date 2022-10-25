import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import "../scss/shift-schedule.scss";
import ShiftScheduleTopic from "./ShiftScheduleTopic";
import ShiftScheduleTimeslot from "./ShiftScheduleTimeslot";
import ShiftScheduleEmployee from "./ShiftScheduleEmployee";
import ShiftScheduleSlotItem from "./ShiftScheduleSlotItem";

const tempDay = [
   "08:00 - 10:00",
   "10:00 - 12:00",
   "12:00 - 14:00",
   "14:00 - 16:00",
   "16:00 - 18:00",
];

const tempShift = [
   {
      "08:00 - 10:00": [3],
      "10:00 - 12:00": [3],
      "12:00 - 14:00": [],
      "14:00 - 16:00": [4],
      "16:00 - 18:00": [4],
   },
   {
      "08:00 - 10:00": [2],
      "10:00 - 12:00": [2],
      "12:00 - 14:00": [],
      "14:00 - 16:00": [4],
      "16:00 - 18:00": [1],
   },
   {
      "08:00 - 10:00": [1],
      "10:00 - 12:00": [1],
      "12:00 - 14:00": [],
      "14:00 - 16:00": [1],
      "16:00 - 18:00": [1],
   },
   {
      "08:00 - 10:00": [4],
      "10:00 - 12:00": [4],
      "12:00 - 14:00": [],
      "14:00 - 16:00": [4],
      "16:00 - 18:00": [2],
   },
   {
      "08:00 - 10:00": [3],
      "10:00 - 12:00": [3, 4],
      "12:00 - 14:00": [4],
      "14:00 - 16:00": [4],
      "16:00 - 18:00": [1],
   },
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

const ShiftSchedule = () => {
   const [employees, setEmployees] = useState(tempEmployee);
   const [dragEmp, setDragEmp] = useState([]);
   const [shift, setShift] = useState(tempShift);
   const [change, setChange] = useState(0);

   useEffect(() => {
      var arr = [];
      for (let i = 0; i < employees.length; i++) {
         arr.push(false);
      }
      setDragEmp(arr);
   }, []);

   const handleOnDragEnd = (result) => {
      var arr = dragEmp;
      arr[result.source.index] = false;
      setDragEmp(arr);
      if (result.destination.droppableId === "character") return;
      const empId = result.source.index + 1;
      const dropId = result.destination.droppableId;
      const day = dropId.split("-")[3];
      const timeSlot = dropId.split("-")[2];
      var temp = shift;
      temp[day][tempDay[timeSlot]].push(empId);
      setShift(temp);
      setChange(change + 1);
   };

   const handleDragStart = (result) => {
      var arr = dragEmp;
      arr[result.source.index] = true;
      setDragEmp(arr);
   };

   return (
      <>
         <div>
            <Box
               sx={{
                  width: "85vw",
                  height: "75vh",
                  boxShadow: 3,
                  borderRadius: 2,
               }}
            >
               <ShiftScheduleTopic></ShiftScheduleTopic>
               <div className="shift-content">
                  <DragDropContext
                     onDragEnd={handleOnDragEnd}
                     onDragStart={handleDragStart}
                  >
                     <div className="shift-content-timetable">
                        {tempDay.map((slot, index) => {
                           const height = 94 / tempDay.length - 0.6;
                           const lastElement = index === tempDay.length - 1;
                           return (
                              <div
                                 key={`${index}-${change}`}
                                 style={{ height: `${height}%` }}
                              >
                                 <ShiftScheduleTimeslot
                                    shift={shift}
                                    employees={tempEmployee}
                                    time={slot}
                                    height={100}
                                    index={index}
                                 ></ShiftScheduleTimeslot>
                                 {lastElement ? (
                                    <></>
                                 ) : (
                                    <Divider sx={{ width: "100%" }} />
                                 )}
                              </div>
                           );
                        })}
                     </div>

                     <Droppable droppableId="character">
                        {(provided) => (
                           <div
                              className="shift-content-employee"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                           >
                              {employees.map((emp, index) => {
                                 const lastElement =
                                    index === employees.length - 1;
                                 return (
                                    <Draggable
                                       key={index}
                                       draggableId={`drag-emp-${index}`}
                                       index={index}
                                    >
                                       {(provided) => (
                                          <div
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             ref={provided.innerRef}
                                          >
                                             {!dragEmp[index] ? (
                                                <>
                                                   <ShiftScheduleEmployee
                                                      employee={emp}
                                                   ></ShiftScheduleEmployee>
                                                   {lastElement ? (
                                                      <></>
                                                   ) : (
                                                      <Divider
                                                         sx={{ width: "100%" }}
                                                      />
                                                   )}
                                                </>
                                             ) : (
                                                <ShiftScheduleSlotItem
                                                   name={`${employees[index].firstname} ${employees[index].lastname}`}
                                                   role={"Theke"}
                                                ></ShiftScheduleSlotItem>
                                             )}
                                          </div>
                                       )}
                                    </Draggable>
                                 );
                              })}
                              {provided.placeholder}
                           </div>
                        )}
                     </Droppable>
                  </DragDropContext>
               </div>
            </Box>
         </div>
      </>
   );
};

export default ShiftSchedule;
