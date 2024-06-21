package com.orbysol.orbysol.repository;

import com.orbysol.orbysol.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientRepository extends MongoRepository<Patient, String> {
    Patient findByEmail(String email);
}
