import Reatc, { useEffect, useState } from "react"
import {
    Grid,
    Paper,
    Button
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { textAlign } from "@mui/system";
import CreateUser from "../Authentication/createUser";
import GetAllUsers from "../Commons/usersAPI";

const EmployeeMan = () => {
    const [empEmail, setEmpmail] = useState();
    const [isSubmitting, setubmitting] = useState(false);
    const [rows,setRows] = useState([]);
    const columns = [
        // { field: 'id', headerName: 'ID', width: 50 },
        { field: 'id', headerName: 'Number', width: 100 },
        { field: 'username', headerName: 'Email', width: 300 }];

        
    const handleEmailChange = (event) => {
        setEmpmail(event.target.value)
    }
    const createEmployee = () => {
        let params={email:empEmail}
        CreateUser(params).then((resp) => {
            // console.log(`User create response ${JSON.stringify(resp)}`);
            if (resp.Status !== "SUCCESS") {
              setubmitting(false);
              return window.alert(`${resp.Message} `);
            } else {
              setubmitting(false);
              return window.alert(`${resp.Message} `);
            }
          });
    }
    useEffect(()=>{
        GetAllUsers().then((usrs)=>{
            setRows(usrs);
        })
    })
    const myStyle = {
        // color: "white",
       // backgroundColor: "DodgerBlue",
        padding: "5px",
        fontFamily: "Sans-Serif",
        align: "left",
        margin: "10px"
      };
    return (
        <Grid container >
            <Grid item xs={8} >
                    <h6>Create Employee</h6>
                    <form  >
                        <label >
                            Email  :
                            <input style={myStyle} type="text" value={empEmail} onChange={(e) =>handleEmailChange(e)}/>
                            </label>
                        <Button  variant="contained" size="small" onClick={createEmployee} >save</Button>
                    </form>

            </Grid>
            <Grid item xs={10}>
                <Paper sx={{ margin: 2 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Paper>
            </Grid>

        </Grid>
    )
}
export default EmployeeMan;