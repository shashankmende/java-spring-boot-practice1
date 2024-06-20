package com.orbysol.orbysol.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbysol.orbysol.model.Patient;
import com.orbysol.orbysol.repository.patientRepository;

@Service
public class PatientService {
    @Autowired
    private patientRepository repository;

    public Patient addPatient(Patient patient){
        return repository.save(patient);
    }

    public List<Patient> findAllPatients(){
            return    repository.findAll();

    }
   
    public Object getPatient(String email){
        return repository.findByEmail(email);
    }

   


}
