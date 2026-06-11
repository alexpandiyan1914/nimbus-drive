package com.nimbusdrive.backend.dto;

public class FileNodeResponse {

    private Long id;
    private String name;
    private boolean folder;
    private Long size;

    public FileNodeResponse(
            Long id,
            String name,
            boolean folder,
            Long size) {

        this.id = id;
        this.name = name;
        this.folder = folder;
        this.size = size;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isFolder() {
        return folder;
    }

    public Long getSize() {
        return size;
    }
}