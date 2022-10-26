import React, { useState } from "react";
import { Link, useNavigate, BrowserRouter, Route } from "react-router-dom";
import * as Yup from "yup";
import { Box, Stack, Container, Card, CardMedia } from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Checkbox,
  TextField,
  Button,
  InputAdornment,
  FormControlLabel,
  Paper,
} from "@material-ui/core";
import Authenticate from "./auth";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginHeaderComponent from "../Admin/loginHeader";
import AuthRoles from "./AuthRoles";
const UserLogin = ({ func }) => {
  const [isSubmitting, setubmitting] = React.useState(false);
  let navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    pswrd: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      pswrd: "",
    },
    validationSchema: LoginSchema,

    onSubmit: (creds) => {
      // let completeEmail = "";
      // if (creds.email.slice(-16, -1) !== "@co-opbank.co.k") {
      //   completeEmail = `${creds.email}@co-opbank.co.ke`;
      // } else {
      //   completeEmail = creds.email;
      // }
      // window.alert(completeEmail);y
      let params = {
        email: creds.email,
        pswrd: creds.pswrd,
      };
      // console.log(JSON.stringify(params));
      Authenticate(params)
        .then((user) => {
          if (user.Status !== "SUCCESS") {
            setubmitting(false);
            return window.alert(`${user.Message} `);
          } else {
            localStorage.setItem("token", user.token);
            localStorage.setItem("curUserEmail", user.email);

              let rols = user.userRoles;
            
              var rolesArr = [];
              rols.map((usrRols) => {
                rolesArr.push(usrRols.role);
              });
              localStorage.setItem("userRoles", JSON.stringify(rolesArr));

              if (rolesArr.includes("Admin")) {
                setubmitting(false);
                localStorage.setItem("userRole", "admin");
              }
              if (rolesArr.includes("Reports") && !rolesArr.includes("Admin")) {
                setubmitting(false);
                localStorage.setItem("userRole", "Reports");
                localStorage.setItem("expired", 0);
              }
              navigate("/dashboard");
          }
        })

        .catch((err) => {
          setubmitting(false);
          return window.alert(`Error occured ${err}`);
        });
    },
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  return (
    <Container maxWidth="sm">
      <LoginHeaderComponent />
      <Box
        sx={{
          width: 400,
          height: 400,
          paddingTop: 10,
          paddingLeft: 10,
        }}
      >
        {/* <img src={logo} width="200" height="40" /> */}
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                {...getFieldProps("pswrd")}
                error={Boolean(touched.pswrd && errors.pswrd)}
                helperText={touched.pswrd && errors.pswrd}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Remember me"
              />
              {/* <Link to="/register">Sign up</Link> */}
            </Stack>

            <LoadingButton
              loading={isSubmitting}
              loadingPosition="start"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              login
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Box>
    </Container>
  );
};

export default UserLogin;
