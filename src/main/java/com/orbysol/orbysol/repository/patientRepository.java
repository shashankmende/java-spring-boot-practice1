// package com.orbysol.orbysol.repository;

// import com.orbysol.orbysol.model.Patient;
// import org.springframework.data.mongodb.repository.MongoRepository;

// public interface PatientRepository extends MongoRepository<Patient, String> {
//     Patient findByEmail(String email);
// }


package com.orbysol.orbysol.repository;

import com.orbysol.orbysol.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByEmail(String email);
}
