import React from "react";
import axios from "axios";

const CreateUser = (creds) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/createEmployee`;

  const resp = new Promise((resolve, reject) => {
    const params = {
      username: creds.email,
    };
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
    };

    axios
      .post(httpUrl, params, { headers })
      .then((res) => {
        console.log(`User create response ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  // console.log(`Response Params ${JSON.stringify(resp)}`);
  return resp;
};
export default CreateUser;
