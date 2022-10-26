import { React, useState, useRef, useEffect } from "react";
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
  RadioGroup,
  Radio,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import UpdateConfigs from "../Commons/appConfigs";
import FormLabel from "@mui/material/FormLabel";
import ConfigDetailsAPI from "../Commons/appConfigDetails";
import ConfigByIdAPI from "../Commons/ConfigByIdAPI";
import dateFormat, { masks } from "dateformat";
const ConfigMan = () => {
  const stDate = useRef(new Date());
  const [paramDate, setParamDate] = useState(new Date());
  const [isSubmitting, setsubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState("textd");
  const [selectionModel, setSelectionModel] = useState("");
  const selectedParameter = useRef("");
  const [configParam, setConfigParam] = useState("");

  const [configRows, setConfigRows] = useState({});

  const [confVal, setConfVal] = useState();

  const configColumns = [
    { field: "param", headerName: "Parameter", width: 150 },
    { field: "value", headerName: "Value", width: 300 },
    { field: "valType", headerName: "Type", width: 100 },
  ];

  useEffect(() => {
    ConfigDetailsAPI().then((confs) => {
      setConfigRows(confs);
    });
  });

  const stmSchema = Yup.object().shape({
    param: Yup.string().optional(),
    valdate: Yup.date().optional(),
    confVal: Yup.string().optional(),
  });
  const formik = useFormik({
    initialValues: {
      param: "",
      valdate: "",
      confVal: "",
    },
    validationSchema: stmSchema,
    onSubmit: (values) => {
      // window.alert(stDate.current);
      setsubmitting(true);
      let pval = "";
      let vtype = "";
      if (selectedValue === "datex") {
        pval = stDate.current; // dateFormat(stDate.current, "yyyy-MM-dd");
        vtype = "date";
      } else {
        pval = values.confVal;
        vtype = "text";
      }
      // window.alert(pval);
      const userParams = {
        param: configParam,
        confVal: pval,
        valType: vtype,
      };
      UpdateConfigs(userParams).then((rcds) => {
        window.alert(rcds.Message);
        console.log(rcds.Message);
      });
      setsubmitting(false);
    },
  });
  const fetchConfigById = () => {
    // window.alert(selectedParameter.current);
    ConfigByIdAPI(selectedParameter.current).then((confObject) => {
      setConfigParam(confObject.param);
      let fieldType = confObject.valType;
      let configValue = confObject.value;
      if (fieldType === "date") {
        setSelectedValue("datex");
        setParamDate(configValue);
      } else {
        setSelectedValue("textd");
        formik.values.confVal = configValue;
        // setConfVal(configValue);
      }
    });
  };
  const updateStartDate = (val) => {
    setParamDate(val);
    stDate.current = val;
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "field-type",
    inputProps: { "aria-label": item },
  });
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
            {/* <p>Date selected :{paramDate}</p> */}
            <FormLabel id="configForm">Parameter type</FormLabel>
            <TextField
              fullWidth
              type="text"
              // label={configParam}
              value={configParam}
              // {...getFieldProps("param")}
              // error={Boolean(touched.param && errors.param)}
              // helperText={touched.param && errors.param}
            />
            <RadioGroup
              row
              // aria-labelledby="demo-row-radio-buttons-group-label"
              name="paramType"
            >
              <FormControlLabel
                value="date"
                control={<Radio {...controlProps("datex")} />}
                label="Date"
              />
              <FormControlLabel
                value="text"
                control={<Radio {...controlProps("textd")} />}
                label="Text"
              />
            </RadioGroup>
            {selectedValue === "datex" ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  format="dd/MM/yyyy"
                  id="stdt"
                  label="Date"
                  value={paramDate}
                  onChange={(xdate) => {
                    updateStartDate(xdate);
                  }}
                  renderInput={(paramDate) => <TextField {...paramDate} />}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                fullWidth
                type="text"
                label="Parameter value"
                // value={formik.values.confVal}
                {...getFieldProps("confVal")}
                error={Boolean(touched.confVal && errors.confVal)}
                helperText={touched.confVal && errors.confVal}
              />
            )}

            <LoadingButton
              loading={isSubmitting}
              loadingPosition="start"
              // fullWidth
              size="small"
              type="submit"
              variant="contained"
            >
              save
            </LoadingButton>
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
        {
          <DataGrid
            rows={configRows}
            onSelectionModelChange={(newSelectionModel) => {
              selectedParameter.current = newSelectionModel;
              setSelectionModel(newSelectionModel);

              fetchConfigById();
            }}
            columns={configColumns}
            pageSize={15}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            {...selectionModel}
          />
        }
      </Grid>
    </Grid>
  );
};
export default ConfigMan;
