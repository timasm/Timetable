import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import "../scss/shift-schedule.scss";
import ShiftScheduleTopic from "./ShiftScheduleTopic";
import ShiftScheduleTimeslot from "./ShiftScheduleTimeslot";
import ShiftScheduleEmployee from "./ShiftScheduleEmployee";

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
   const [shift, setShift] = useState(tempShift);
   const [change, setChange] = useState(0);

   useEffect(() => {}, [shift]);

   const handleOnDragEnd = (result) => {
      const empId = result.source.index + 1;
      const dropId = result.destination.droppableId;
      const day = dropId.split("-")[3];
      const timeSlot = dropId.split("-")[2];
      var temp = shift;
      //console.log(temp[day]["08:00 - 10:00"]);
      temp[day][tempDay[timeSlot]].push(empId);
      //console.log(temp[day][tempDay[timeSlot]]);
      setShift(temp);
      setChange(change + 1);
      /*
    const items = Array.from(employees);
    const [recordedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recordedItems);

    setEmployees(items);*/
      console.log(shift);
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
                  <DragDropContext onDragEnd={handleOnDragEnd}>
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
                              className="character shift-content-employee"
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
