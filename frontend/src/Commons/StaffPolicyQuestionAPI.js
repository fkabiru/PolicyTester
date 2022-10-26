import axios from "axios";

const StaffPolicyQuestionsAPI = (policyObj) => {
    const httpUrl = `${process.env.REACT_APP_BASE_URL}/getInactivePolicyQuestions`;

    const resp = new Promise((resolve, reject) => {

        const headers = {
            method: "POST",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        };
        axios
            .post(httpUrl, policyObj, { headers })
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
export default StaffPolicyQuestionsAPI;