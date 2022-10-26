import axios from "axios";
const PolicyQuestion =(qsnBjt)=>{
    const httpUrl = `${process.env.REACT_APP_BASE_URL}/createPolicyQuestion`;

    const resp = new Promise((resolve, reject) => {
      
      const headers = {
        method: "POST",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      };
      axios
        .post(httpUrl,qsnBjt, { headers })
        .then((res) => {
          console.log(`Roles ${JSON.stringify(res)}`);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
    return resp;
}
export default PolicyQuestion;