import React from "react";
import axios from "axios";

const UpdateConfigs = (request) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/addConfig`;

  const resp = new Promise((resolve, reject) => {
    const params = {
      param: request.param,
      value: request.confVal,
      valType: request.valType,
    };
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    // window.alert(`Selected Date ${JSON.stringify(params)}`);
    console.log(`Configs request ${JSON.stringify(params)}`);
    axios
      .post(httpUrl, params, { headers })
      .then((res) => {
        console.log(`Config response ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default UpdateConfigs;
