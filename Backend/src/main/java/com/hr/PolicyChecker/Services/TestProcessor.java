package com.hr.PolicyChecker.Services;

import com.hr.PolicyChecker.Models.EmployeeTest;
import com.hr.PolicyChecker.Models.Policy;
import com.hr.PolicyChecker.Models.PolicyQuestions;
import com.hr.PolicyChecker.Models.QuestionAnswerObject;
import com.hr.PolicyChecker.Repository.DBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TestProcessor {
    //The list contains  questions for specific policy by an employee
    List<PolicyQuestions> activeQuestion = new ArrayList<>();

    //All Policy Questions List
    List<PolicyQuestions> questionsList = null;

    //Inactive Policy Questions List
    List<PolicyQuestions> availableQuestionsList = null;


    //Map that maintain each employee's questions
    Map<String,List> employeeQuestionsMap = new HashMap<>();


    @Autowired
    DBRepository dbr;
    //Get all policy Questions
        public List<PolicyQuestions> getPolicyQuestions(String policy){
             questionsList = dbr.getPolicyQuestions(policy);
            return questionsList;
        }
        //Get list of active questions in the session, and store their Ids in another list
    public void activeQuestions(){
            int i = 0;
        for (PolicyQuestions qsn : availableQuestionsList) {
            activeQuestion.add(i,qsn);
            i++;
        }
    }
    //Get all policy Questions that are not active.
    public List<PolicyQuestions> getInactivePolicyQuestions(String policy,String username){
            if(employeeQuestionsMap.containsKey(username)){
                return employeeQuestionsMap.get(username);
            }else {
                availableQuestionsList = dbr.getInactivePolicyQuestions(policy, activeQuestion);
                employeeQuestionsMap.put(username, availableQuestionsList);
                //Update List of Active Questions
                activeQuestions();
            }
        return employeeQuestionsMap.get(username);
    }
}
