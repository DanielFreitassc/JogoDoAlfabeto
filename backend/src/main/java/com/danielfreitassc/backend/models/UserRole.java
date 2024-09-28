package com.danielfreitassc.backend.models;

public enum UserRole {
    ADMIN("ADMIN"),
    PROFESSOR("PROFESSOR"),
    ALUNO("ALUNO");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
    
}
