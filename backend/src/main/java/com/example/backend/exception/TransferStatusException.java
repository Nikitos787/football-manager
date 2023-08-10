package com.example.backend.exception;

public class TransferStatusException extends RuntimeException {
    public TransferStatusException(String message) {
        super(message);
    }
}
