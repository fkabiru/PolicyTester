package com.hr.PolicyChecker.Models;

import java.util.List;

public class EmployeeTest {
    String question,answer,employee,policy;
    int timeTaken;

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    boolean isAnswerCorrect;

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(int timeTaken) {
        this.timeTaken = timeTaken;
    }

    public boolean isAnswerCorrect() {
        return isAnswerCorrect;
    }

    public void setAnswerCorrect(boolean answerCorrect) {
        isAnswerCorrect = answerCorrect;
    }

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
    }
}
