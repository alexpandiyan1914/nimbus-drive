package com.nimbusdrive.backend.dto;

public class UploadResponse {

    private Long id;
    private String name;
    private String path;

    public UploadResponse(Long id, String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPath() {
        return path;
    }
}