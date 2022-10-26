import { React, useState } from "react";
import axios from "axios";

const EmailSmtAPI = (userParams) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/emailStatement`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const params = {
      accountNo: userParams.loanAcc,
      startDt: userParams.startDt,
      endDt: userParams.endDt,
      curUser: userParams.curUser,
      statementType: userParams.request,
    };
    console.log(`Request ${JSON.stringify(params)}`);

    axios
      .post(httpUrl, params, { headers })
      .then((res) => {
        console.log(`Loans Statement ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default EmailSmtAPI;
