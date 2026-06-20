package com.nimbusdrive.backend.dto;
import org.springframework.core.io.Resource;

public record PreviewResponse(
        Resource resource,
        String mimeType
) {
}
