import React from "react";
import axios from "axios";

const AuthRoles = (email) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/getUserRoles`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "POST",
      "Content-Type": "application/plain",
    };

    axios
      .post(httpUrl, email, { headers })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};
export default AuthRoles;
