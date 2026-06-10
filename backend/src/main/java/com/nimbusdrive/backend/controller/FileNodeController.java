package com.nimbusdrive.backend.controller;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.entity.FileNode;
import com.nimbusdrive.backend.service.FileNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.nimbusdrive.backend.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileNodeController {

    @Autowired
    private FileNodeService fileNodeService;

    @PostMapping("/folders")
    public FileNode createFolder(
            @RequestBody CreateFolderRequest request) {

        return fileNodeService.createFolder(request);
    }

    @PostMapping("/files/upload")
    public UploadResponse uploadFile(
            @RequestParam("file") MultipartFile file) {

        return fileNodeService.uploadFile(file);
    }

}