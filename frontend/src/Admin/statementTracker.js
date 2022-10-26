import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Grid,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LoansSmtAPI from "../Commons/loansStmtAPI";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountSmtAPI from "../Commons/AccountStmtAPI";
import TrackSmtAPI from "../Commons/trackStmtAPI";

const StatementTracker = (props) => {
  const accColumns = [
    { field: "senderemail", headerName: "Staff Email", width: 250 },
    { field: "totalsent", headerName: "Sent Statements", width: 150 },
  ];
  const [isSubmitting, setsubmitting] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [records, setRecords] = useState({});
  const stDate = useRef(new Date());
  const enDate = useRef(new Date());

  const stmSchema = Yup.object().shape({
    stdt: Yup.date().required("Satrt date require!"),
    eddt: Yup.date().required("End date required!"),
  });
  const formik = useFormik({
    initialValues: {
      stdt: startDate,
      eddt: endDate,
    },
    validationSchema: stmSchema,
    onSubmit: (values) => {
      setsubmitting(true);
      const userParams = {
        startDt: stDate.current,
        endDt: enDate.current,
      };
      TrackSmtAPI(userParams).then((rcds) => {
        setRecords(rcds);
      });
      setsubmitting(false);
    },
  });
  const updateStartDate = (val) => {
    setStartDate(val);
    stDate.current = val;
  };
  const updateEndDate = (val) => {
    setEndDate(val);
    enDate.current = val;
  };

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <div sx={{ width: "100%", padding: "2%" }}>
      <Box component="span">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            m: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  format="dd/MM/yyyy"
                  id="stdt"
                  label="Start Date"
                  value={startDate}
                  onChange={(curdate) => {
                    updateStartDate(curdate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  format="dd/MM/yyyy"
                  id="eddt"
                  label="End Date"
                  value={endDate}
                  onChange={(curdt) => {
                    updateEndDate(curdt);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LoadingButton
                sx={{ ml: 8, mt: 3 }}
                loading={isSubmitting}
                loadingPosition="start"
                size="small"
                type="submit"
                variant="contained"
              >
                submit
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
        <DataGrid
          rows={records}
          columns={accColumns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
};
export default StatementTracker;
