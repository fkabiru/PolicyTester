import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  MenuItem,
  MenuList,
  Divider,
  ListItemText,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HeaderComponent from "./adminHeader";
import { Link, Outlet } from "react-router-dom";
import { letterSpacing } from "@mui/system";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const AdminDashBoarrd = ({ user }) => {
  let navigate = useNavigate();

  const goRoles = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/roles");
    }
  };
  const goEmployees = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/employees");
    }
  };
  const goPolicyQuestions = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/policyQuestions");
    }
  };
  const goStaffPolicyTest = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/staffTest");
    }
  };
  const goLoans = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/loans");
    }
  };
  const goAccounts = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/accounts");
    }
  };
  const stmtRecords = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/statementRecord");
    }
  };
  const genConfigs = () => {
    if (localStorage.getItem("curUserEmail") === null) {
      navigate("/");
    } else {
      navigate("/dashboard/generalConfigs");
    }
  };
  const usrtype = localStorage.getItem("userRole");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} padding="2">
        <HeaderComponent />
      </Grid>
      <Grid item xs={2}>
        <Paper sx={{ marginTop: 5 }}>
          <MenuList dense>
          {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={goEmployees} inset>
                  Employees Management
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )}
            {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={goPolicyQuestions} inset>
                  Policy Questions
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )}
            {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={goStaffPolicyTest} inset>
                  Policy Test
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )}
            {/* {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={goRoles} inset>
                  Roles Management
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )}
            {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={goEmployees} inset>
                  Employees Management
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem>
              <ListItemText onClick={goLoans} inset>
                Loan Statement
              </ListItemText>
            </MenuItem>
            <Stack />

            <MenuItem>
              <ListItemText onClick={goAccounts} inset>
                Account Statements
              </ListItemText>
            </MenuItem>
            {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={stmtRecords} inset>
                  Track Record
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )}
            {usrtype === "admin" ? (
              <MenuItem>
                <ListItemText onClick={genConfigs} inset>
                  General Configs
                </ListItemText>
              </MenuItem>
            ) : (
              ""
            )} */}
          </MenuList>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
export default AdminDashBoarrd;
