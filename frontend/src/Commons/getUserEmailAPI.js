import React from "react";
import axios from "axios";

const GetUserEmailAPI = (userId) => {
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/usrEmailById`;

  const resp = new Promise((resolve, reject) => {
    let userdata = {
      id: userId.id,
      email: userId.email,
      datecreated: userId.dateCreated,
      createdby: userId.createdBy,
      active: userId.active,
      pswrd: userId.pswrd,
    };
    console.log(JSON.stringify(userdata));
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .post(httpUrl, userId, { headers })
      .then((res) => {
        // console.log(`User ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
};

export default GetUserEmailAPI;
