import React from "react";
import axios from "axios";

const LoansSmtAPI = (userParams) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/loanStatement`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      "x-content-type-options": "nosniff",
      Authorization: localStorage.getItem("token"),
    };
    const params = {
      accountNo: userParams.loanAcc,
      startDt: userParams.startDt,
      endDt: userParams.endDt,
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

export default LoansSmtAPI;
