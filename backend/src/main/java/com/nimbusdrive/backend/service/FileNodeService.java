package com.nimbusdrive.backend.service;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.dto.UploadResponse;
import com.nimbusdrive.backend.entity.FileNode;
import org.springframework.web.multipart.MultipartFile;
import com.nimbusdrive.backend.dto.FileNodeResponse;
import java.util.List;
import org.springframework.core.io.Resource;

public interface FileNodeService {

    FileNode createFolder(CreateFolderRequest request);

    UploadResponse uploadFile(MultipartFile file);

    List<FileNodeResponse> getFiles(Long parentId);

    void deleteFile(Long id);

    Resource downloadFile(Long id);

}