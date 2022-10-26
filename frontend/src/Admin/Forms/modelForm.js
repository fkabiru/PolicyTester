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
import ModelApi from "../../Commons/admin/modelAddApi";

const ModelForm = ({ handleCloseModel }) => {
  const modelSchema = Yup.object().shape({
    model: Yup.string().required("model is required"),
  });

  const formik = useFormik({
    initialValues: {
      model: "",
    },
    validationSchema: modelSchema,
    onSubmit: (data) => {
      ModelApi(data).then((resp) => {
        if (resp.data.status_code !== "00") {
          console.log(`**** Add model Resp: ${JSON.stringify(resp)}`);
          handleCloseModel = { handleCloseModel };
        }
        console.log(`**** Succee model Resp: ${JSON.stringify(resp)}`);
        handleCloseModel = { handleCloseModel };
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
              id="model"
              label="Model"
              type="text"
              fullWidth
              variant="standard"
              {...getFieldProps("model")}
              error={Boolean(touched.model && errors.model)}
              helperText={touched.model && errors.model}
            />
            <Button type="submit" disabled={isSubmitting}>
              save
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </Container>
  );
};
export default ModelForm;
