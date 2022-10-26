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
import EmailSmtAPI from "../Commons/emailAPI";
import AccountSmtAPI from "../Commons/AccountStmtAPI";
import { Document, pdfjs, Page } from "react-pdf";

const AccountStatement = () => {
  const [isSubmitting, setsubmitting] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [stmList, setStmtList] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const stDate = useRef(new Date());
  const enDate = useRef(new Date());
  const [accObject, setAccObject] = useState({});
  const [isEmailReady, setIsEmailReady] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [base64, setBase64] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSender, setIsSender] = useState(false);

  const loanStmSchema = Yup.object().shape({
    loanAcc: Yup.string().required("Loan account is required"),
    stdt: Yup.date().required("Satrt date require!"),
    eddt: Yup.date().required("End date required!"),
  });
  const formik = useFormik({
    initialValues: {
      loanAcc: "",
      stdt: startDate,
      eddt: endDate,
    },
    validationSchema: loanStmSchema,
    onSubmit: (values) => {
      setsubmitting(true);
      const userParams = {
        loanAcc: values.loanAcc,
        startDt: stDate.current,
        endDt: enDate.current,
      };
      // Populate {accObject} object with the current account

      AccountSmtAPI(userParams)
        .then((pth) => {
          if (pth.status === "400") {
            setsubmitting(false);
            return window.alert(`${pth.error} `);
          }
          setBase64(pth.base64);
          updateAccountParams(userParams);
          setIsEmailReady(true);
          let userRoles = JSON.parse(localStorage.getItem("userRoles"));
          if (userRoles.includes("Admin")) setIsAdmin(true);
          if (userRoles.includes("Send")) setIsSender(true);
        })
        .then(() => {
          setsubmitting(false);
        });
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
  // This function sends email to customer
  const emailStatement = () => {
    setIsSendingEmail(true);

    EmailSmtAPI(accObject).then((emailStatus) => {
      setIsSendingEmail(false);
      return window.alert(`${emailStatus.status} `);
    });
  };

  const updateAccountParams = (accParams) => {
    let accPrms = {
      loanAcc: accParams.loanAcc,
      startDt: accParams.startDt,
      endDt: accParams.endDt,
      curUser: localStorage.getItem("curUserEmail"),
      request: `account`,
    };
    setAccObject(accPrms);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function startDownload() {
    const linkSource = `data:application/pdf;base64,${base64}`;
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = "Account statement";
    downloadLink.click();
  }
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <div sx={{ width: "100%", padding: "2%" }}>
      <Box component="span">
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 2,
              ml: 5,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField
                  sx={{ ml: 2, mt: 3 }}
                  autoFocus
                  margin="normal"
                  id="loanAcc"
                  label="Statement Account"
                  type="text"
                  {...getFieldProps("loanAcc")}
                  error={Boolean(touched.loanAcc && errors.loanAcc)}
                  helperText={touched.loanAcc && errors.loanAcc}
                  variant="standard"
                />
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

                {!isSubmitting ? (
                  <LoadingButton
                    sx={{ ml: 2, mt: 3 }}
                    loadingPosition="start"
                    size="small"
                    type="submit"
                  >
                    view
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    sx={{ ml: 2, mt: 3 }}
                    loadingPosition="start"
                    size="small"
                  >
                    processing . . . .
                  </LoadingButton>
                )}
                {(isEmailReady && isAdmin) || (isEmailReady && isSender) ? (
                  <LoadingButton
                    sx={{ ml: 2, mt: 3 }}
                    loadingPosition="start"
                    size="small"
                    onClick={startDownload}
                  >
                    download
                  </LoadingButton>
                ) : (
                  ""
                )}
                {(isEmailReady && isAdmin) || (isEmailReady && isSender) ? (
                  <LoadingButton
                    sx={{ ml: 2, mt: 3 }}
                    loading={isSendingEmail}
                    loadingPosition="start"
                    size="small"
                    onClick={emailStatement}
                  >
                    email
                  </LoadingButton>
                ) : (
                  ""
                )}
              </Form>
            </FormikProvider>
          </Box>
        </div>
        {isEmailReady ? (
          <Box sx={{ ml: 8, mt: 3, width: "150%" }}>
            <Document
              file={`data:application/pdf;base64,
              ${base64}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};
export default AccountStatement;
