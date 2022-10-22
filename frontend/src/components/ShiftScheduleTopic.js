import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "../scss/shift-schedule.scss";

const ShiftScheduleTopic = () => {
  return (
    <>
      <div style={{ height: "6%" }}>
        <CardContent
          sx={{ height: "100%", padding: 0, paddingTop: "0.5%" }}
          className="shift-topic-container"
        >
          <Typography
            sx={{
              width: "12%",
              textAlign: "center",
              borderRight: "1px solid lightgray",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Zeit
          </Typography>
          <Typography
            sx={{
              width: "14.6%",
              textAlign: "center",
              borderRight: "1px solid lightgray",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Montag
          </Typography>
          <Typography
            sx={{
              width: "14.6%",
              textAlign: "center",
              borderRight: "1px solid lightgray",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Dienstag
          </Typography>
          <Typography
            sx={{
              width: "14.6%",
              textAlign: "center",
              borderRight: "1px solid lightgray",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Mittwoch
          </Typography>
          <Typography
            sx={{
              width: "14.6%",
              textAlign: "center",
              borderRight: "1px solid lightgray",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Donnerstag
          </Typography>
          <Typography
            sx={{
              width: "14.6%",
              textAlign: "center",
              borderRight: "1px solid lightgray",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Freitag
          </Typography>
          <Typography
            sx={{
              width: "15%",
              textAlign: "center",
              padding: 0,
              margin: 0,
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Mitarbeiter
          </Typography>
        </CardContent>
      </div>
    </>
  );
};

export default ShiftScheduleTopic;
