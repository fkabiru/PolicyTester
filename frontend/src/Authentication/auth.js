import React from "react";
import axios from "axios";

const Authenticate = (creds) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/userLogin`;

  const resp = new Promise((resolve, reject) => {
    const params = {
      username: creds.email,
      password: creds.pswrd,
    };
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
    };
    console.log(`Post Loging in`);
    axios
      .post(httpUrl, params, { headers })
      .then((res) => {
        console.log(`Response Params ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  // console.log(`Response Params ${JSON.stringify(resp)}`);
  return resp;
};
export default Authenticate;
