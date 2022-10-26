import axios from "axios";
const  GetAllPolicies=() =>{
    const httpUrl = `${process.env.REACT_APP_BASE_URL}/getAllPolicy`;

  const resp = new Promise((resolve, reject) => {
    
    const headers = {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(httpUrl, { headers })
      .then((res) => {
        console.log(`Config response ${JSON.stringify(res)}`);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return resp;
    
}
export default GetAllPolicies