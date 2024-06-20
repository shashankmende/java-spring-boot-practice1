package com.orbysol.orbysol.repository;

import com.orbysol.orbysol.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface patientRepository extends MongoRepository<Patient,String> {

    Object findByEmail(String email);
    
}
