import React from "react";
import axios from "axios";

const UsersAPI = () => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/allUsers`;

  const resp = new Promise((resolve, reject) => {
    const headers = {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(httpUrl, { headers })
      .then((res) => {
        // console.log(`users ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default UsersAPI;
