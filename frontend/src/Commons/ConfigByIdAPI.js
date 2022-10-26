import React from "react";
import axios from "axios";

const ConfigByIdAPI = (configId) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/fetchConfigById`;
  const confObj = {
    id: configId[0],
  };
  // window.alert(JSON.stringify(confObj));
  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .post(httpUrl, confObj, { headers })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default ConfigByIdAPI;
