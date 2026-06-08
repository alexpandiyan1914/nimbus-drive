package com.nimbusdrive.backend.service;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.entity.FileNode;

public interface FileNodeService {

    FileNode createFolder(CreateFolderRequest request);

}