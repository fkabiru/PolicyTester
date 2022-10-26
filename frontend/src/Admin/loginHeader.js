import React from "react";
import {
  Paper,
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import logo from "../images/logo.jpg";
import logo from "../images/kns-logo.png";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LoginHeaderComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#f9c0b4" }}>
        <Toolbar>
          <img src={logo} width="200" height="40" />
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HR Policy CHecker
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default LoginHeaderComponent;
