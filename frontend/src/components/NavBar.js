import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "../scss/nav-bar.scss";

const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <AppBar position="static" sx={{ height: "74px" }}>
        <Toolbar variant="dense">
          <Typography
            sx={{
              height: "100%",
              width: "100%",
              fontSize: "24px",
              textAlign: "center",
              paddingTop: "32px"
            }}
            variant="h6"
            color="inherit"
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
