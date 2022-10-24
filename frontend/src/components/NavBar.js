import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "../scss/nav-bar.scss";

const NavBar = () => {
   return (
      <div className="nav-bar-container">
         <AppBar
            position="static"
            sx={{ height: "74px", backgroundColor: "rgba(24, 118, 210, .6)" }}
         >
            <Toolbar variant="dense">
               <Typography
                  sx={{
                     height: "100%",
                     width: "100%",
                     fontSize: "28px",
                     textAlign: "center",
                     paddingTop: "32px",
                     fontWeight: "500",
                  }}
                  variant="h6"
                  color="white"
                  component="div"
               >
                  Terminplaner
               </Typography>
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default NavBar;
