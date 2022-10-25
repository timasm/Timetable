import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const ShiftScheduleSlotItem = ({ name, role }) => {
   return (
      <div style={{ height: "48px", width: "90%", marginTop: "8px" }}>
         <Card
            sx={{ width: "100%", height: "100% !important" }}
            variant="outlined"
         >
            <Typography
               sx={{ fontSize: 14, width: "100%", paddingLeft: "8px" }}
               color="text.secondary"
               gutterBottom
            >
               {name}
            </Typography>
            <Typography
               sx={{ fontSize: 14, width: "100%", paddingLeft: "8px" }}
               color="text.secondary"
               gutterBottom
            >
               {`Bereich: ${role}`}
            </Typography>
         </Card>
      </div>
   );
};

export default ShiftScheduleSlotItem;
