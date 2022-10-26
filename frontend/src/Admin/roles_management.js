import { React, useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Paper,
  Grid,
  Button,
  Modal,
  Typography,
  Select,
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  Container,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DataGridPro,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import RolesAPI from "../Commons/rolesAPI";
import UsersAPI from "../Commons/usersAPI";
import GetUserEmailAPI from "../Commons/getUserEmailAPI";
import UserAssignRolesAPI from "../Commons/userAssignRolesAPI";
import CreateUser from "../Authentication/createUser";
import AuthRoles from "../Authentication/AuthRoles";
import UpdateUserRole from "../Commons/updateRolesAPI";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const RolesManagement = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const [usrsRows, setUsrsRows] = useState({});

  const userColumns = [
    // { field: "id", headerName: "ID", width: 80 },
    { field: "email", headerName: "Email Address", width: 300 },
    // { field: "active", headerName: "Status", width: 300 },
  ];
  const [curUser, setcurUser] = useState("");
  const [selectionModel, setSelectionModel] = useState("");
  const [curUserEmail, setCurUserEmail] = useState("");
  const curUserId = useRef("");
  const [rolesList, setRolesList] = useState([]);
  const [curRole, setCurRole] = useState("");
  const [isSubmitting, setubmitting] = useState(false);
  const [isUserselected, setIsUserSelected] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);
  const [hasSend, setHasSend] = useState(false);
  const [hasReport, setHasReport] = useState(false);
  const selectedUserEmail = useRef("");

  useEffect(() => {
    UsersAPI().then((usrs) => {
      setUsrsRows(usrs);
    });
  });

  const handleChange = (event) => {
    setCurRole(event.target.value);
  };
  const getUserEmail = () => {
    let userData = {
      id: curUserId.current[0],
      email: "",
      dateCreated: "",
      createdBy: "",
      active: "",
      pswrd: "",
    };
    GetUserEmailAPI(userData).then((userData) => {
      selectedUserEmail.current = userData.email;
      setIsUserSelected(true);
      AuthRoles(selectedUserEmail.current).then((rols) => {
        var rolesArr = [];
        rols.map((usrRols) => {
          rolesArr.push(usrRols.assignedroles);
        });
        console.log(`USER ROLES : ${JSON.stringify(rolesArr)}`);
        if (rolesArr.includes("Admin")) setHasAdmin(true);
        if (rolesArr.includes("Send")) setHasSend(true);
        if (rolesArr.includes("Reports")) setHasReport(true);
      });
    });
  };
  const updateUserReportsRole = () => {
    let actiontype = "";
    if (hasReport) {
      setHasReport(false);

      actiontype = "revoke";
    } else {
      setHasReport(true);
      actiontype = "assign";
    }
    let systemUser = localStorage.getItem("curUserEmail");
    let request = {
      email: selectedUserEmail.current,
      role: "Reports",
      action: actiontype,
      assignedBy: systemUser,
    };
    UpdateUserRole(request)
      .then((resp) => {
        if (resp.response.Status === "00") window.location.reload();
        // window.alert(`Report role successfully ${actiontype}`);
      })
      .catch((e) => {
        window.alert(`${e} of Report role Failed!!`);
      });
  };
  const updateUserAdminRole = () => {
    let actiontype = "";
    if (hasAdmin) {
      setHasAdmin(false);
      actiontype = "revoke";
    } else {
      setHasAdmin(true);
      actiontype = "assign";
    }
    let systemUser = localStorage.getItem("curUserEmail");
    let request = {
      email: selectedUserEmail.current,
      role: "Admin",
      action: actiontype,
      assignedBy: systemUser,
    };
    UpdateUserRole(request)
      .then((resp) => {
        if (resp.response.Status === "00") window.location.reload();
      })
      .catch((e) => {
        window.alert(`${e} of Admin role Failed!!`);
      });
  };
  const updateUserSendStatementRole = () => {
    let actiontype = "";
    if (hasSend) {
      setHasSend(false);
      actiontype = "revoke";
    } else {
      setHasSend(true);
      actiontype = "assign";
    }
    let systemUser = localStorage.getItem("curUserEmail");
    let request = {
      email: selectedUserEmail.current,
      role: "Send",
      action: actiontype,
      assignedBy: systemUser,
    };
    UpdateUserRole(request)
      .then((resp) => {
        if (resp.response.Status === "00") window.location.reload();
      })
      .catch((e) => {
        window.alert(`${e} of Statement role Failed!!`);
      });
  };
  const deleteSystemUser = () => {
    var actiontype = "delete";
    let request = {
      email: selectedUserEmail.current,
      role: "Admin",
      action: actiontype,
    };
    UpdateUserRole(request)
      .then((resp) => {
        if (resp.response.Status === "00") window.location.reload();
      })
      .catch((e) => {
        window.alert(`${e} of Admin role Failed!!`);
      });
  };
  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: userSchema,
    onSubmit: (creds) => {
      setubmitting(true);
      CreateUser(creds).then((resp) => {
        // console.log(`User create response ${JSON.stringify(resp)}`);
        if (resp.Status !== "00") {
          setubmitting(false);
          // return window.alert(`${resp.Message} `);
        } else {
          setubmitting(false);
        }
      });
    },
  });
  const deselectUser = () => {
    selectedUserEmail.current = null;
    setIsUserSelected(false);
    window.location.reload();
  };
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  return (
    <Grid container spacing={5}>
      <Grid
        md="4"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          //m: 10,
          mt: 5,
          ml: 5,

          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {!isUserselected ? (
              <TextField
                fullWidth
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            ) : (
              ""
            )}
            {isUserselected ? (
              <FormGroup>
                <h4>{selectedUserEmail.current} Roles </h4>
                <FormControlLabel
                  control={<Checkbox checked={hasAdmin} />}
                  onChange={updateUserAdminRole}
                  label="Admin"
                />
                <FormControlLabel
                  control={<Checkbox checked={hasSend} />}
                  onChange={updateUserSendStatementRole}
                  label="Send Statement"
                />
                <FormControlLabel
                  control={<Checkbox checked={hasReport} />}
                  onChange={updateUserReportsRole}
                  label="View Statement"
                />
              </FormGroup>
            ) : (
              ""
            )}
            {!isUserselected ? (
              <LoadingButton
                loading={isSubmitting}
                loadingPosition="start"
                // fullWidth
                size="large"
                type="submit"
                // variant="contained"
              >
                add user
              </LoadingButton>
            ) : (
              ""
            )}
            {isUserselected ? (
              <LoadingButton
                loading={isSubmitting}
                loadingPosition="start"
                size="large"
                onClick={deleteSystemUser}
              >
                delete user
              </LoadingButton>
            ) : (
              ""
            )}
            {isUserselected ? (
              <LoadingButton
                loading={isSubmitting}
                loadingPosition="start"
                size="large"
                onClick={deselectUser}
              >
                cancil
              </LoadingButton>
            ) : (
              ""
            )}
          </Form>
        </FormikProvider>
      </Grid>
      <Grid
        md="6"
        sx={{
          display: "flex",
          // flexDirection: "row",
          p: 2,
          //m: 10,
          mt: 5,
          //  ml: 5,
          mr: 2,

          bgcolor: "background.paper",
          // borderRadius: 1,
        }}
      >
        <DataGrid
          rows={usrsRows}
          onSelectionModelChange={(newSelectionModel) => {
            curUserId.current = newSelectionModel;
            setSelectionModel(newSelectionModel);
            getUserEmail();
          }}
          columns={userColumns}
          pageSize={15}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          {...selectionModel}
        />
      </Grid>
    </Grid>
  );
};
export default RolesManagement;
