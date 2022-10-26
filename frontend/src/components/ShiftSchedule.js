import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import "../scss/shift-schedule.scss";
import { urls } from "../config";
import ShiftScheduleTopic from "./ShiftScheduleTopic";
import ShiftScheduleTimeslot from "./ShiftScheduleTimeslot";
import ShiftScheduleEmployee from "./ShiftScheduleEmployee";
import ShiftScheduleSlotItem from "./ShiftScheduleSlotItem";

const ShiftSchedule = () => {
   const dispatch = useDispatch();
   const { setDay, setShiftSchedule } = bindActionCreators(
      actionCreators,
      dispatch
   );

   const day = useSelector((state) => state.shift.day);
   const employees = useSelector((state) => state.shift.employees);
   const shiftSchedule = useSelector((state) => state.shift.shiftSchedule);
   const [dragEmp, setDragEmp] = useState([]);
   const [change, setChange] = useState(0);

   /**
    * These are the get functions
    * @param {string} url - Backend Api endpoint
    * @returns {json}
    */
   const getMethod = async (url) => {
      let headers = new Headers();
      const response = await fetch(url, {
         method: "GET",
         headers,
      });
      const responseAsJson = await response.json();
      return responseAsJson;
   };
   const getDay = async () => {
      const responseDay = await getMethod(`${urls.day}TimeSlots/`);
      setDay(responseDay.slots);
   };
   const getShiftSchedule = async () => {
      const ResponseSchiftSchedule = await getMethod(`${urls.shiftSchedule}1/`);
      setShiftSchedule(ResponseSchiftSchedule.data);
   };

   /**
    *
    * @param {list} data - modified Shift Schedule
    * @param {string} url - url for shiftSchedule Api Endpoint
    */
   const putMethod = async (data, url) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      const body = {
         data: data,
      };
      await fetch(url, {
         method: "PUT",
         headers,
         body: JSON.stringify(body),
      });
      getShiftSchedule();
   };

   /**
    * Function to handle Drag and Drop
    * @param {json} result - automatically generated react-dnd response
    * @returns
    */
   const handleOnDragEnd = async (result) => {
      resetDragBoolean(result.source.index);
      if (result.destination.droppableId === "character") return;
      putMethod(modifyShiftSchedule(result), `${urls.shiftSchedule}1/`);
      setChange(change + 1);
   };
   const resetDragBoolean = (idx) => {
      var arr = dragEmp;
      arr[idx] = false;
      setDragEmp(arr);
   };
   const modifyShiftSchedule = (result) => {
      const empId = result.source.index + 1;
      const dropId = result.destination.droppableId;
      const dayIdx = dropId.split("-")[3];
      const timeSlot = dropId.split("-")[2];
      var temp = shiftSchedule;
      temp[dayIdx][day[timeSlot]].push(empId);
      console.log(temp);
      return temp;
   };
   const handleDragStart = (result) => {
      var arr = dragEmp;
      arr[result.source.index] = true;
      setDragEmp(arr);
   };

   /**
    * Onload functions
    */
   useEffect(() => {
      getDay();
      getShiftSchedule();
      // eslint-disable-next-line
   }, []);
   useEffect(() => {
      var arr = [];
      for (let i = 0; i < employees.length; i++) {
         arr.push(false);
      }
      setDragEmp(arr);
      // eslint-disable-next-line
   }, []);

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
                        {day.map((slot, index) => {
                           const height = 94 / day.length - 0.6;
                           const lastElement = index === day.length - 1;
                           return (
                              <div
                                 key={`${index}-${change}`}
                                 style={{ height: `${height}%` }}
                              >
                                 <ShiftScheduleTimeslot
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
