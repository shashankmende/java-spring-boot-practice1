package com.orbysol.orbysol.model;


import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "patients")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Patient {

    
    private String firstName;
    private String lastName;
    public String email;
    
}
