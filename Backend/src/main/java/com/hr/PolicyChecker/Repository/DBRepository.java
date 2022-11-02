/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hr.PolicyChecker.Repository;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.hr.PolicyChecker.Models.*;
import com.hr.PolicyChecker.Services.CommonOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 *
 * @author fnkab
 */
@Service
public class DBRepository {

    @Autowired
    JdbcTemplate jdbctemp;

    @Autowired
    CommonOperations cmo;

    public JsonObject addEmployee(Employee emp) {
        String empUserName = emp.getUsername();
        String pswd = emp.getPassword();

        JsonObject resp = new JsonObject();
        try {
            String q_user = "INSERT INTO employee (username,password) VALUES('" + empUserName + "','"+pswd+"')";
            System.out.print("\n DBRepository Insert Message " + q_user+"\n");
            int rows = jdbctemp.update(q_user);
            if (rows > 0) {
                resp.addProperty("Status", "SUCCESS");
                resp.addProperty("Message", "Employee created Successfully");
            }
        } catch (DataAccessException ex) {
            resp.addProperty("Status", "FAIL");
            resp.addProperty("Message", "Request Failed");
            System.out.print("DB ERROR:" + ex.getMessage());
        }
        return resp;
    }
    public JsonObject createPolicy(Policy plc){
        String policy = plc.getPolicy();

        JsonObject resp = new JsonObject();
        try {
            String q_policy = "INSERT INTO hrPolicies (Policy) VALUES('" + policy + "')";
            System.out.print("\n DBRepository Insert Message " + q_policy+"\n");
            int rows = jdbctemp.update(q_policy);
            if (rows > 0) {
                resp.addProperty("Status", "SUCCESS");
                resp.addProperty("Message", "Policy created Successfully");
            }
        } catch (DataAccessException ex) {
            resp.addProperty("Status", "FAIL");
            resp.addProperty("Message", "Request Failed");
            System.out.print("DB ERROR:" + ex.getMessage());
        }
        return resp;
    }
    public JsonObject getAllPolicies(){
        String query = "SELECT * FROM hrPolicies";
        List<Policy> allPolicies = null;
        JsonObject jPolicy = new JsonObject();
        try{
            allPolicies = jdbctemp.query(query, new PolicyRowMapper());
            JsonArray jr = new JsonArray();
            allPolicies.forEach((jplc)->{
                System.out.println("\n"+jplc.getPolicy());
                JsonObject jop = new JsonObject();
                jop.addProperty("policy",jplc.getPolicy());
                jr.add(jop);
            });
            jPolicy.add("HRPolicies",jr);
            jPolicy.addProperty("Status","SUCCESS");
        }catch (DataAccessException ex){
            jPolicy.addProperty("Status","Error");
            jPolicy.addProperty("Message","Error during policy query !");
        }
        return jPolicy;
    }
    public class PolicyRowMapper implements RowMapper<Policy>{

        @Override
        public Policy mapRow(ResultSet rs, int rowNum)   {
            Policy plco = new Policy();
            try {
                plco.setPolicy(rs.getString("Policy"));
            }catch (SQLException ex){
                System.out.println(ex.getMessage());
            }
            return plco;
        }
    }
    public JsonObject createPolicyQuestion(PolicyQuestions plcq) {
        String policy = plcq.getPolicy();
        String policyQuestion = plcq.getPolicyQuestions();
        List<IncorrectAnswer> incorrectQsn = plcq.getIncorrectAns();

        JsonArray wrongAnswerArray = new JsonArray();
        JsonObject incorrectJson = null;

        for (IncorrectAnswer ans : incorrectQsn) {
            incorrectJson = new JsonObject();
            incorrectJson.addProperty("Incorrect_Answer", ans.getIncorrectAnswer());
            wrongAnswerArray.add(incorrectJson);
        }


        String correctAns = plcq.getCorrectAnswer();

        JsonObject resp = new JsonObject();
        try {
            String q_policyq = "INSERT INTO policyquestions (Policy,PolicyQuestions,IncorrectAnswerObject,CorrectAnswer) " +
                    "VALUES('" + policy + "','" + policyQuestion + "','" + wrongAnswerArray + "','" + correctAns + "')";
            System.out.print("\n DBRepository Insert Message " + q_policyq + "\n");
            int rows = jdbctemp.update(q_policyq);
            if (rows > 0) {
                resp.addProperty("Status", "SUCCESS");
                resp.addProperty("Message", "Policy created Successfully");
            }
        } catch (DataAccessException ex) {
            resp.addProperty("Status", "FAIL");
            resp.addProperty("Message", "Request Failed");
            System.out.print("DB ERROR:" + ex.getMessage());
        }
        return resp;
    }
        //Query All Policy Questions that are available

        public List<PolicyQuestions> getPolicyQuestions(String polc){
            String query ="SELECT * FROM policyquestions WHERE Policy = '"+polc+"'";
            List<PolicyQuestions> policyQsn =null;

            System.out.println("Query Executed "+query);

            try{
                policyQsn = jdbctemp.query(query,new PolicyQuestionRowMappers()) ;
        } catch (DataAccessException ex) {

        System.out.print("DB ERROR:" + ex.getMessage());
    }
            return policyQsn;
        }

        //Query Inactive Policy Questions
    public List<PolicyQuestions> getInactivePolicyQuestions(String polc, List<PolicyQuestions> activetPolicy){

        //There are active policy questions in the session,
        // Filter query to fetch Questions not in the session
        String query = null;
        int s = activetPolicy.size();
        if(s>0) {
            StringBuffer ids = new StringBuffer();
            String qIds = "";

        for(int i =0;i<s;i++){
            System.out.println("\n Q ID "+activetPolicy.get(i).getIdPolicyQuestions()+"\n");
                ids.append(activetPolicy.get(i).getIdPolicyQuestions());
            if(i != s-1)
                ids.append(",");
        };
             qIds = ids.toString();
             query = "SELECT * FROM policyquestions " +
                     "WHERE Policy = '"+polc+"' AND idPolicyQuestions NOT IN ("+qIds+") LIMIT 1";
        }else{
            //There are no active Policy Questions in the session, No need to filter the query.
            query = "SELECT * FROM policyquestions WHERE Policy = '"+polc+"' LIMIT 4";
        }

        List<PolicyQuestions> availableQsn =null;

        System.out.println("Query Executed "+query);

        try{
            availableQsn = jdbctemp.query(query,new PolicyQuestionRowMappers()) ;
        } catch (DataAccessException ex) {

            System.out.print("DB ERROR:" + ex.getMessage());
        }
        return availableQsn;
    }

    public class PolicyQuestionRowMappers implements RowMapper<PolicyQuestions>{


        @Override
        public PolicyQuestions mapRow(ResultSet rs, int rowNum) {
            PolicyQuestions plcq = new PolicyQuestions();
            try{
                plcq.setIdPolicyQuestions(rs.getInt("idPolicyQuestions"));
                plcq.setPolicy(rs.getString("Policy"));
                plcq.setPolicyQuestions(rs.getString("PolicyQuestions"));
                plcq.setCorrectAnswer(rs.getString("CorrectAnswer"));
                plcq.setQueriedIncorrectAnswers( rs.getObject("IncorrectAnswerObject"));

            }catch ( SQLException ex){
                System.out.println(ex.getMessage());
            }
            return plcq;
        }
    }
    public JsonObject addRole(RolesMan rln) {
        JsonObject resp = new JsonObject();
        String qr = "INSERT INTO ROLES (RoleDescription) VALUES ('" + rln.getRoleDescription() + "')";
        try {
            int rows = jdbctemp.update(qr);

            if (rows > 0) {
                resp.addProperty("Status", "SUCCESS");
                resp.addProperty("Message", "Roles created Successfully");
            } else {
                resp.addProperty("Status", "Fail");
                resp.addProperty("Message", "0 records created");
            }
        } catch (DataAccessException ex) {
            resp.addProperty("Status", "Error");
            resp.addProperty("Message", "Error Occurred");
            System.out.println("\n "+ex.getMessage());
        }
        return resp;
    }

        public JsonObject assignRole(RoleAssignment rlns){

            JsonObject resp = new JsonObject();
            String query = "SELECT Username FROM EMPLOYEE WHERE Username LIKE '%"+rlns.getUsername()+"%' ";
            System.out.println("\n ***  "+query+" ***\n");
            try {

                String empName = jdbctemp.queryForObject(query, String.class);

                if (empName.equals(null)) {
                    resp.addProperty("Status", "Fail");
                    resp.addProperty("Message", "User does not exist");
                    return resp;
                }
                else {

                    // First check if this user has this role, to avoid duplicate records
                    String qs= "SELECT COUNT(employeeEmail) AS count FROM employeeroles" +
                            " WHERE employeeEmail LIKE '%"+rlns.getUsername()+"%' AND Role LIKE '%"+rlns.getRole()+"%'";
                    int count = jdbctemp.queryForObject(qs, Integer.class);

                    //if this user has not been granted this role, assign it.
                    if(count<1) {
                        System.out.println("\n *** Assigning Roles ***\n");
                        String qr = "INSERT INTO employeeroles (Role,employeeEmail) VALUES ('" + rlns.getRole() + "','" + rlns.getUsername() + "')";

                        int rows = jdbctemp.update(qr);

                        if (rows > 0) {
                            resp.addProperty("Status", "SUCCESS");
                            resp.addProperty("Message", "Roles created Successfully");
                        } else {
                            resp.addProperty("Status", "Fail");
                            resp.addProperty("Message", "0 records created");
                        }
                    }else {
                        resp.addProperty("Status", "Fail");
                        resp.addProperty("Message", rlns.getUsername()+ " already has "+ rlns.getRole()+" role. ");
                        return resp;
                    }
                }
            }catch (DataAccessException ex){
                resp.addProperty("Status", "Error");
                resp.addProperty("Message", "Error Occurred");
                System.out.println("\n "+ex.getMessage());
            }
        return resp;
    }
    public JsonObject loginUser(UserLogin uslg){
        JsonObject resp = new JsonObject();
        String username = uslg.getUsername();
        String pswrd = uslg.getPassword();
        String query = "SELECT * FROM EMPLOYEE WHERE Username LIKE '%"+username+"%' AND password LIKE '%"+pswrd+"%'";
        Employee emp = null;
        try {
             emp = jdbctemp.queryForObject(query, BeanPropertyRowMapper.newInstance(Employee.class));
            if (emp.equals(null)) {
                resp.addProperty("Status", "Fail");
                resp.addProperty("Message", "Request Failed, ensure you provide correct details !");
                return resp;
            } else {
                List<RoleAssignment> empRoles =empRoles(emp);
                JsonArray jArrayRole = new JsonArray();
                empRoles.forEach(rol->{
                    JsonObject jrole = new JsonObject();
                    jrole.addProperty("role",rol.getRole());
                    jArrayRole.add(jrole);
                });
                resp.add("userRoles", jArrayRole);

                String token = cmo.generateLoginToken(username);

                resp.addProperty("token",token);
                resp.addProperty("email",username);
                resp.addProperty("Status","SUCCESS");
            }
        }catch (DataAccessException ex){
            resp.addProperty("Status","Error");
            resp.addProperty("Message","Login request Error !");
            System.out.println("\n "+ex.getMessage());
        }
        return resp;
    }

    public class RoleAssignmentRowMapper implements RowMapper<RoleAssignment>{

        @Override
        public RoleAssignment mapRow(ResultSet rs, int rowNum) throws SQLException {
            RoleAssignment rlasn = new RoleAssignment();
            rlasn.setRole(rs.getString("Role"));
            rlasn.setUsername(rs.getString("employeeEmail"));

            return rlasn;
        }
    }

    //Query Employee Roles
    public List<RoleAssignment> empRoles(Employee emp){
        String qry = "SELECT * FROM Employeeroles WHERE employeeEmail LIKE '%"+emp.getUsername()+"%'";
        System.out.print("QUERY "+ qry);
        List<RoleAssignment> rlsgn =null;
        JsonArray roles = new JsonArray();
        try {
            rlsgn = jdbctemp.query(qry, new RoleAssignmentRowMapper());
        }catch (DataAccessException ex){

            System.out.print("ERROR "+ ex.getMessage());
        }
        return rlsgn;
    }
    public List<Employee> getUsers(Employee emp){
        String qry = "SELECT * FROM Employee WHERE Username NOT IN ( '"+emp.getUsername()+"')";
        System.out.print("QUERY "+ qry);
        List<Employee> emplst =null;
        JsonArray roles = new JsonArray();
        try {
            emplst = jdbctemp.query(qry, new EmployeeRowMapper());
        }catch (DataAccessException ex){

            System.out.print("ERROR "+ ex.getMessage());
        }
        return emplst;
    }
    public class EmployeeRowMapper implements RowMapper<Employee>{

        @Override
        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
            Employee emp = new Employee();
            emp.setId(rs.getInt("Employee_Id"));
            emp.setUsername(rs.getString("Username"));

            return emp;
        }
    }
}
