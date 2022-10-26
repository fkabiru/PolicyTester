import React from "react";
import axios from "axios";

const ConfigDetailsAPI = () => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/fetchConfigs`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    // window.alert(`Selected Date ${JSON.stringify(params)}`);
    axios
      .get(httpUrl, { headers })
      .then((res) => {
        // console.log(`Config response response ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default ConfigDetailsAPI;
