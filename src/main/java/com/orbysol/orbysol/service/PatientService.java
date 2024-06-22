package com.orbysol.orbysol.service;

import com.orbysol.orbysol.model.Patient;
import com.orbysol.orbysol.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    public Optional<Patient> getPatientByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Patient addPatient(Patient patient) {
        return repository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return repository.findAll();
    }
}
