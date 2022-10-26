import React from "react";
import axios from "axios";

const UserAssignRolesAPI = (roleAssign) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/assignUserRoles`;

  const resp = new Promise((resolve, reject) => {
    let userdata = {
      assignedby: roleAssign.assignedby,
      assignedroles: roleAssign.assignedroles,
      useremail: localStorage.getItem("curUserEmail"),
    };
    console.log(JSON.stringify(userdata));
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .post(httpUrl, userdata, { headers })
      .then((res) => {
        console.log(`User ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default UserAssignRolesAPI;
