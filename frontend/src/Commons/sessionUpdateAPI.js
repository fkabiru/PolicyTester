import React from "react";
import axios from "axios";

const SessionUpdateAPI = (request) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/checkSession`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const reqst = {
      request: request.request,
      token: localStorage.getItem("token"),
    };

    axios
      .post(httpUrl, reqst, { headers })
      .then((res) => {
        console.log(
          `Response session status now  :${JSON.stringify(res.data)} `
        );
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default SessionUpdateAPI;
