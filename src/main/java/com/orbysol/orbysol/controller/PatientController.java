package com.orbysol.orbysol.controller;

import com.orbysol.orbysol.model.Patient;
import com.orbysol.orbysol.service.PatientService;

import java.util.List;
import java.util.Optional; // Import statement for Optional

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class PatientController {

    @Autowired
    private PatientService service;

    @PostMapping("/newPatient")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createPatient(@RequestBody Patient patient) {
        try {
            // Check if patient with the same email already exists
            Optional<Patient> existingPatient = service.getPatientByEmail(patient.getEmail());
            if (existingPatient.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                     .body("Patient with email " + patient.getEmail() + " already exists.");
            }
            
            // If patient does not exist, add the new patient
            Patient createdPatient = service.addPatient(patient);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPatient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to create patient: " + e.getMessage());
        }
    }

    @GetMapping("/byEmail")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getPatientByEmail(@RequestParam String email) {
        try {
            Optional<Patient> patient = service.getPatientByEmail(email);
            if (patient.isPresent()) {
                return ResponseEntity.ok(patient.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found for email: " + email);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to get patient: " + e.getMessage());
        }
    }

    @GetMapping("/testPath")
    @CrossOrigin(origins = "http://localhost:3000")
    public String testingMethod() {
        return "new testing method";
    }

    @GetMapping("/patients")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Patient>> getAllPatients() {
        try {
            List<Patient> patients = service.getAllPatients();
            return ResponseEntity.ok().body(patients);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/test")
    public String testing() {
        return "Testing is done!";
    }
}
