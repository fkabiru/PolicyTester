import React from "react";
import axios from "axios";

const UpdateUserRole = (request) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/assignUserRoles`;

  const resp = new Promise((resolve, reject) => {
    const params = {
      useremail: request.email,
      assignedroles: request.role,
      action: request.action,
      assignedby: request.assignedBy,
    };
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    console.log(`Role assign request ${JSON.stringify(params)}`);
    axios
      .post(httpUrl, params, { headers })
      .then((res) => {
        console.log(`Roles action response ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default UpdateUserRole;
