package com.nimbusdrive.backend.service.impl;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.entity.FileNode;
import com.nimbusdrive.backend.repository.FileNodeRepository;
import com.nimbusdrive.backend.service.FileNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileNodeServiceImpl implements FileNodeService {

    @Value("${nimbus.storage.path}")
    private String storagePath;

    @Autowired
    private FileNodeRepository repository;

    @Override
    public FileNode createFolder(CreateFolderRequest request) {

        String folderPath = storagePath + File.separator + request.getName();

        File folder = new File(folderPath);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        FileNode fileNode = new FileNode();

        fileNode.setName(request.getName());
        fileNode.setPath(folderPath);
        fileNode.setMimeType(null);
        fileNode.setSize(0L);
        fileNode.setIsFolder(true);
        fileNode.setParentId(request.getParentId());

        return repository.save(fileNode);
    }
}