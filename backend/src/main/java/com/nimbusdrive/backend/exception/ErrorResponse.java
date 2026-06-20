package com.nimbusdrive.backend.exception;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public record ErrorResponse (LocalDateTime timestamp, int status, String message) {

}
