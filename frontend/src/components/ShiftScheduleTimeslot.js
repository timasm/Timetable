import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
            {[1, 2, 3, 4, 5].map((number) => {
               return (
                  <Droppable
                     key={number}
                     droppableId={`time-slot-${index}-${number}`}
                  >
                     {(provided) => (
                        <div
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           ref={provided.innerRef}
                           id={`emp-${number}-${index}`}
                           className="employee-in-timeslot"
                        ></div>
                     )}
                  </Droppable>
               );
            })}
         </Box>
      </>
   );
};

export default ShiftScheduleTimeslot;
