import React from "react";
import axios from "axios";

const RolesAPI = () => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/roles`;

  const resp = new Promise((resolve, reject) => {
    // const params = {
    //   email: creds.email,
    //   password: creds.password,
    // };
    const headers = {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(httpUrl, { headers })
      .then((res) => {
        console.log(`Roles ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default RolesAPI;
