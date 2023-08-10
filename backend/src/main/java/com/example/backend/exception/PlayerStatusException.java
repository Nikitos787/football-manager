package com.example.backend.exception;

public class PlayerStatusException extends RuntimeException {
    public PlayerStatusException(String message) {
        super(message);
    }
}
