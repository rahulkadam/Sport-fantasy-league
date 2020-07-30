package com.garv.satta.fantasy.exceptions;

public class ErrorInfo {
    public final String error_description;
    public final String error;

    public ErrorInfo(String error, String error_description) {
        this.error = error;
        this.error_description = error_description;
    }
}
