import { Grid, Paper, Radio, FormControl, FormControlLabel, RadioGroup, Button } from "@mui/material";
import { useEffect, useState } from "react"
import StaffPolicyQuestionsAPI from "../Commons/StaffPolicyQuestionAPI";

const StaffPolicyTest = () => {
    const [staffQuestions, setStaffQuestions] = useState([]);
    const [questionAnswers] = useState([]);

    useEffect(() => {
        let policyTopic = {
            policy: "CUSTOMER SERVICE",
            employee: localStorage.getItem("curUserEmail")
        }
        if (staffQuestions.length < 1) {
            StaffPolicyQuestionsAPI(policyTopic).then((qsn) => {
                setStaffQuestions(qsn);
            })
        }

    })

    const handleOptionChange= ((changeEvent)=> {
        
          window.alert(changeEvent.target.value) 
        });
      
      
    let qn = 0;
    return (
        <Grid Container>
            <div style={{ textAlign: 'left' }}>

                <h3>Policy Questions</h3>
                {staffQuestions.map((stfQtn) => {
                    qn = qn + 1;
                    let incorrectAnswerArray = JSON.parse(stfQtn.queriedIncorrectAnswers);

                    return <div style={{ width: "25" }}>

                        <h5> {qn}. {stfQtn.policyQuestions} ?</h5>

                        {incorrectAnswerArray.map((incAns) => {

                            return <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value={incAns.Incorrect_Answer} onChange={handleOptionChange} control={<Radio />} 
                                    inputProps={{ 'aria-label': 'B' }}  label={incAns.Incorrect_Answer} />
                                    
                                </RadioGroup>
                            </FormControl>

                        })}
                    </div>

                })}
                <br></br>
                <Button>submit</Button>
            </div>

        </Grid>
    )
}
export default StaffPolicyTest;