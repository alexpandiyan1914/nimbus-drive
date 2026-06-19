package com.nimbusdrive.backend.controller;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.entity.FileNode;
import com.nimbusdrive.backend.service.FileNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.nimbusdrive.backend.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;
import com.nimbusdrive.backend.dto.FileNodeResponse;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/files")
    public List<FileNodeResponse> getFiles(@RequestParam(required = false) Long parentId) {

        return fileNodeService.getFiles(parentId);
    }

    @DeleteMapping("/files/{id}")
    public String deleteFile(
            @PathVariable Long id) {

        fileNodeService.deleteFile(id);

        return "Deleted successfully";
    }

    @GetMapping("/files/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id) {

        Resource resource =
                fileNodeService.downloadFile(id);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                resource.getFilename() +
                                "\""
                )
                .body(resource);
    }

}