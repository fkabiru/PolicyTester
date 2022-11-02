import axios from "axios";

const GetAllUsers=()=>{
  const httpUrl = `${process.env.REACT_APP_BASE_URL}/getUsers`;

  const resp = new Promise((resolve, reject) => {
    let param = {
      username: localStorage.getItem("curUserEmail")
    };
    console.log(JSON.stringify(param));
    const headers = {
      method: "POST",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .post(httpUrl, param, { headers })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
}
export default GetAllUsers