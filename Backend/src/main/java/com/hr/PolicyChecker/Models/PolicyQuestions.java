package com.hr.PolicyChecker.Models;

import com.google.gson.JsonArray;

import java.util.List;

public class PolicyQuestions {
    String policy,policyQuestions,correctAnswer;
    int idPolicyQuestions;
    List<IncorrectAnswer> incorrectAns;

    Object queriedIncorrectAnswers;

    public int getIdPolicyQuestions() {
        return idPolicyQuestions;
    }

    public void setIdPolicyQuestions(int idPolicyQuestions) {
        this.idPolicyQuestions = idPolicyQuestions;
    }

    public List<IncorrectAnswer> getIncorrectAns() {
        return incorrectAns;
    }

    public void setIncorrectAns(List<IncorrectAnswer> incorrectAns) {
        this.incorrectAns = incorrectAns;
    }

    public String getPolicyQuestions() {
        return policyQuestions;
    }

    public void setPolicyQuestions(String policyQuestions) {
        this.policyQuestions = policyQuestions;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public Object getQueriedIncorrectAnswers() {
        return queriedIncorrectAnswers;
    }

    public void setQueriedIncorrectAnswers(Object queriedIncorrectAnswers) {
        this.queriedIncorrectAnswers = queriedIncorrectAnswers;
    }
}
