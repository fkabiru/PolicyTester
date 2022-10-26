import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../images/kns-logo.png";
import SessionUpdateAPI from "../Commons/sessionUpdateAPI";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const settings = ["Logout"];
const HeaderComponent = () => {
  const expired = useRef(false);
  let navigate = useNavigate();
  // Manually logout user
  const logoutUser = () => {
    manualExpireSession();
    navigate("/");
  };
  // This function is invoked when session automatically expires
  // Whenever there is a mouse event this function is called to update user session
  const updateSession = () => {
    var updateTime = new Date().getTime();
    localStorage.setItem("lastUpdatedTime", updateTime);
  };
  // This function is invoked when the user manually logout
  const manualExpireSession = () => {
    let items = { request: "expire" };
    SessionUpdateAPI(items).then((res) => {
      localStorage.setItem("token", null);
      localStorage.setItem("curUserEmail", null);
      localStorage.setItem("userRoles", null);
    });
  };
  // This function is regularly invoked to check if the user session is expired
  const checkSessionStatus = () => {
    var timeNow = new Date().getTime();
    var lastUpdatedTime = localStorage.getItem("lastUpdatedTime");
    var distance = timeNow - lastUpdatedTime;
    var idolTime = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (idolTime > 3) {
      localStorage.setItem("token", null);
      localStorage.setItem("curUserEmail", null);
      localStorage.setItem("userRoles", null);
      localStorage.setItem("expired", 1);
      navigate("/");
    }
  };
  setInterval(() => {
    checkSessionStatus();
  }, 20000);

  document.addEventListener("mousemove", updateSession);
  document.addEventListener("click", updateSession);
  document.addEventListener("keydown", updateSession);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#f9c0b4" }}>
        <Toolbar>
          <img src={logo} width="200" height="40" />
          <IconButton
            size="large"
            edge="start"
            // color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HR Policy checker
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Typography> {localStorage.getItem("curUserEmail")}</Typography>
            <Button onClick={logoutUser}>logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HeaderComponent;
