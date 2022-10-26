import React from "react";
import axios from "axios";

const TrackSmtAPI = (userParams) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/trackStatement`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const params = {
      startDt: userParams.startDt,
      endDt: userParams.endDt,
    };
    console.log(`Request ${JSON.stringify(params)}`);
    axios
      .post(httpUrl, params, { headers })
      .then((res) => {
        console.log(`Reccord statement ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default TrackSmtAPI;
