import React from "react";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Container,
  TextField,
  Button,
  Box,
  FormControlLabel,
} from "@material-ui/core";
import * as Yup from "yup";
import CategoryApi from "../../Commons/admin/categoryAddApi";
import LoadingButton from "@mui/lab/LoadingButton";

const CategoryForm = ({ handleCloseCat }) => {
  const categorySchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
  });
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: categorySchema,
    onSubmit: (data) => {
      CategoryApi(data).then((resp) => {
        if (resp.data.status_code !== "00") {
          handleCloseCat();
        }
        handleCloseCat();
      });
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: 200,
          height: 200,
          paddingTop: 10,
          paddingLeft: 20,
        }}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="cat"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
            />
            <LoadingButton
              loading={isSubmitting}
              loadingPosition="start"
              size="large"
              type="submit"
              variant="contained"
            >
              Loading
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Box>
    </Container>
  );
};
export default CategoryForm;
