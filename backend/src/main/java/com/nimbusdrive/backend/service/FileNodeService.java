package com.nimbusdrive.backend.service;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.dto.UploadResponse;
import com.nimbusdrive.backend.entity.FileNode;
import org.springframework.web.multipart.MultipartFile;

public interface FileNodeService {

    FileNode createFolder(CreateFolderRequest request);

    UploadResponse uploadFile(MultipartFile file);

}