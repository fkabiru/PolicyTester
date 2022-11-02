import { useEffect, useState } from "react"
import {
    Grid,
    Paper,
    Button, TextField,
    FormControl, InputLabel, Select, OutlinedInput, MenuItem, useTheme
} from "@mui/material";
import GetAllPolicies from "../Commons/AllPoliciesAPI";
import PolicyQuestion from "../Commons/PolicyQuestionAPI";

// function getStyles(polcy, selectedPolicy, theme) {
//     return {
//         fontWeight:
//             selectedPolicy.indexOf(polcy) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

const PolicyQuestions = () => {
    const [selectedPolicy, setSelectedPolicy] = useState([]);
    const [policies, setPolicies] = useState([])
    const [question, setQuestion] = useState();
    const [correctAnswer, setCorrectAnswer] = useState();
    const [incorrectAnswer, setIncorrestAnswer] = useState();
    const [incorrectAnswerArr] = useState([]);
    // const[answerList,setAnswerList] = useState();

    let answerList = [];
    let polArr = [];
    let incorrectAnswerArray = [];
    const addAnswerToList = (ans) => {
        answerList.push(ans)
    }
    useEffect(() => {
        if(policies.length<1){
        GetAllPolicies().then((pol) => {
           
                pol.HRPolicies.map((hpol) => {
                    polArr.push(hpol.policy);
                })
                setPolicies(polArr);
            });
            }
        
    });
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedPolicy(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleQuestion = (event) => {
        setQuestion(event.target.value)
    }
    const handleCorrectAnswer = (event) => {
        setCorrectAnswer(event.target.value)
        //Also add the correct answer in the list of incorrect answers
        
    }
    const handleInCorrectAnswer = (event) => {
        setIncorrestAnswer(event.target.value);
    }
    const updateIncorrectAnswerArray=()=>{
        
        if(incorrectAnswer !=null){
            incorrectAnswerArr.push(incorrectAnswer);
        }
        
        setIncorrestAnswer('');
    }

    const myStyle = {
        // color: "white",
        // backgroundColor: "DodgerBlue",
        padding: "5px",
        fontFamily: "Sans-Serif",
        align: "left",
        margin: "20px"
    };
    const theme = useTheme();
    const reptiles = ["alligator", "snake", "lizard"];

    const postPolicyQuestion =()=>{
        let wrongAns = [];
        incorrectAnswerArr.map((inc)=>{
            wrongAns.push({"incorrectAnswer":inc})
            
        })

        // Add correct answer into the list of incorrect answer
        //  so that it can also be rendered in the answers options.
        wrongAns.push({"incorrectAnswer":correctAnswer});
        
        let policyQsn = {
            policy: selectedPolicy[0],
            policyQuestions: question,
            correctAnswer: correctAnswer,
            incorrectAns: wrongAns
        }
        PolicyQuestion(policyQsn).then((resp)=>{
            if(resp.Status ==="SUCCESS"){
                window.alert("Question created successfully !");
            }else{
                window.alert(resp.Message)
            }
        })
        console.log(policyQsn);
    }

    return (

        <Grid container>
            <Grid item xs={6} >
                {/* <Paper sx={{
                    width: 500,
                    height: 300,
                    paddingTop: 2,
                    paddingLeft: 2,
                    textAlign: 'left'
                }}> */}
                <div row style={{ textAlign: 'left', width: '300' }}>
                    <h6>Policy Questions</h6>

                    <FormControl sx={{ width: 400 }}>
                        <InputLabel id="policy-labels"> Policy</InputLabel>
                        <Select style={{ width: 250 }}
                            labelId="policy-label"
                            id="policy"
                            multiple
                            value={selectedPolicy}
                            onChange={handleChange}
                            input={<OutlinedInput label="Select Policy" />}
                            MenuProps={MenuProps}
                        >
                            {policies.map((polcy) => {
                                return <MenuItem
                                    key={polcy}
                                    value={polcy}
                                // style={getStyles(polcy, selectedPolicy, theme)}
                                >
                                    {polcy}
                                </MenuItem>
                            }
                            )}
                        </Select>
                        <br></br>
                        <TextField
                            label="Question"
                            id="outlined-size-small"
                            defaultValue=""
                            size="small"
                            value={question}
                            onChange={handleQuestion}
                        />
                        <br></br>
                        <TextField
                            label="Correct Answer"
                            id="outlined-size-small"
                            defaultValue=""
                            value={correctAnswer}
                            onChange={handleCorrectAnswer}
                            size="small"
                        />
                        <br></br>
                        <TextField
                            label="Incorrect Answer"
                            id="outlined-size-small"
                            defaultValue=""
                            value={incorrectAnswer}
                            onChange={handleInCorrectAnswer}
                            size="small"
                        />
                        <br></br>
                        <Button fullWidth='false' onClick={updateIncorrectAnswerArray}
                            size="small">ok</Button>
                    </FormControl>
                    
                </div>


            </Grid>
            <Grid sx={4}>
            <div style={{textAlign:'left'}}>
                        <h6> Answers</h6>
                        <br></br>
                        <p>{incorrectAnswerArr.map((inc)=>{
                            return <li>{inc}</li>
                        })}</p>
                    </div>
                    <br></br>
                    <div>
                        {incorrectAnswerArr.length >0 ? (
                    <Button fullWidth='false' onClick={postPolicyQuestion}
                            size="small">save</Button>
                            ) : ("")}
                    </div>
            </Grid>

        </Grid>
    )
}
export default PolicyQuestions;