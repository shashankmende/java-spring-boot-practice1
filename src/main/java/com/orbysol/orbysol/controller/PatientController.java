package com.orbysol.orbysol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.orbysol.orbysol.model.Patient;
import com.orbysol.orbysol.service.PatientService;

@RestController
// @RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService service;
    
    @PostMapping("/createPatient")
    @ResponseStatus(HttpStatus.CREATED)
    public Patient createTask(@RequestBody Patient patient){

        return service.addPatient(patient);
        // return "Create task method is invoked";
    }

    @GetMapping("/getPatient/{email}")
    public Object findAllPatients(@PathVariable String email){
        return service.getPatient(email);
    }

    @GetMapping("/test")
    public String Testing(){
        return "Testing is done! with browser";
    }
}
