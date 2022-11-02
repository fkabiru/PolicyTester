/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hr.PolicyChecker.Controllers;

import com.google.gson.JsonObject;
import com.hr.PolicyChecker.Models.*;
import com.hr.PolicyChecker.Repository.DBRepository;
import com.hr.PolicyChecker.Services.TestProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author fnkab
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class SourceController {

    @Autowired
    DBRepository dbr;

    @Autowired
    TestProcessor tstpr;

    @PostMapping(value = "/createEmployee", consumes = "application/json", produces = "application/json")
    public ResponseEntity createEmployee(@RequestBody Employee emp) {
        String username = emp.getUsername();
        String password = emp.getPassword();
        System.out.print("Incoming Message " + username);
        Employee empdata = new Employee();
        empdata.setUsername(username);
        empdata.setPassword(password);

        JsonObject userResp = dbr.addEmployee(empdata);
        return new ResponseEntity(userResp, HttpStatus.OK);
    }

    @PostMapping(value = "/createPolicy", consumes = "application/json", produces = "application/json")
    public ResponseEntity createPolicy(@RequestBody Policy plc) {
        Policy pol = new Policy();
        pol.setPolicy(plc.getPolicy());
        JsonObject userResp = dbr.createPolicy(plc);
        return new ResponseEntity(userResp, HttpStatus.OK);
    }
    @RequestMapping(value = "/getAllPolicy", produces = "application/json")
    public ResponseEntity createPolicy() {

        JsonObject userResp = dbr.getAllPolicies();
        return new ResponseEntity(userResp, HttpStatus.OK);
    }

    @PostMapping(value = "/createPolicyQuestion", consumes = "application/json", produces = "application/json")
    public ResponseEntity createPolicyQuestion(@RequestBody PolicyQuestions plcQ) {

        PolicyQuestions polq = new PolicyQuestions();
        polq.setPolicy(plcQ.getPolicy());
        polq.setPolicyQuestions(plcQ.getPolicyQuestions());
        polq.setIncorrectAns(plcQ.getIncorrectAns());
        polq.setCorrectAnswer(plcQ.getCorrectAnswer());

        List<IncorrectAnswer> incList = plcQ.getIncorrectAns();

        JsonObject userResp = dbr.createPolicyQuestion(polq);
        return new ResponseEntity(userResp, HttpStatus.OK);
    }

    @PostMapping(value = "/getPolicyQuestions", consumes = "application/json", produces = "application/json")
    public ResponseEntity getPolicyQuestions(@RequestBody Policy plcQ) {
        Policy plc = new Policy();
        plc.setPolicy(plcQ.getPolicy());
        List<PolicyQuestions> policyQstns = tstpr.getPolicyQuestions(plcQ.getPolicy());

        return new ResponseEntity(policyQstns,HttpStatus.OK);
    }
    @PostMapping(value = "/getInactivePolicyQuestions", consumes = "application/json", produces = "application/json")
    public ResponseEntity getInactivePolicyQuestions(@RequestBody EmployeeTest plcQ) {
        EmployeeTest plc = new EmployeeTest();
        plc.setPolicy(plcQ.getPolicy());
        plc.setEmployee(plcQ.getEmployee());
        List<PolicyQuestions> inactivePolicyQstns = tstpr.getInactivePolicyQuestions(plcQ.getPolicy(),plcQ.getEmployee());

        return new ResponseEntity(inactivePolicyQstns,HttpStatus.OK);
    }
    @PostMapping(value = "/createRoles", consumes = "application/json", produces = "application/json")
    public ResponseEntity createRoles(@RequestBody RolesMan rlm) {
        RolesMan rl = new RolesMan();
        rl.setRoleDescription(rlm.getRoleDescription());
        JsonObject jsr = dbr.addRole(rl);

        return new ResponseEntity(jsr,HttpStatus.OK);
    }

    @PostMapping(value = "/assignRole", consumes = "application/json", produces = "application/json")
    public ResponseEntity assignRole(@RequestBody RoleAssignment rls) {
        System.out.println("\n ***  Assignment ***\n");
        RoleAssignment rla = new RoleAssignment();
        rla.setRole(rls.getRole());
        rla.setUsername(rls.getUsername());
        JsonObject jsr = dbr.assignRole(rla);

        return new ResponseEntity(jsr,HttpStatus.OK);
    }

    @PostMapping(value = "/userLogin", consumes = "application/json", produces = "application/json")
    public ResponseEntity userLogin(@RequestBody UserLogin usrl) {
        UserLogin srl = new UserLogin();
        srl.setUsername(usrl.getUsername());
        srl.setPassword(usrl.getPassword());
        JsonObject jsr = dbr.loginUser(srl);
        return new ResponseEntity(jsr,HttpStatus.OK);
    }
    @PostMapping(value = "/getUserRoles", consumes = "application/json", produces = "application/json")
    public ResponseEntity getUserRoles(@RequestBody Employee emp) {
        Employee empl = new Employee();
        empl.setUsername(emp.getUsername());
        List<RoleAssignment> jsr = dbr.empRoles(empl);
        return new ResponseEntity(jsr,HttpStatus.OK);
    }
    @PostMapping(value = "/getUsers", consumes = "application/json", produces = "application/json")
    public ResponseEntity getUsers(@RequestBody Employee emp) {
        Employee empl = new Employee();
        empl.setUsername(emp.getUsername());
        List<Employee> jsr = dbr.getUsers(empl);
        return new ResponseEntity(jsr,HttpStatus.OK);
    }
}