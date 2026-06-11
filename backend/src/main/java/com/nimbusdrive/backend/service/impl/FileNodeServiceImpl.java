package com.nimbusdrive.backend.service.impl;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.entity.FileNode;
import com.nimbusdrive.backend.repository.FileNodeRepository;
import com.nimbusdrive.backend.service.FileNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.nimbusdrive.backend.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.nimbusdrive.backend.dto.FileNodeResponse;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public UploadResponse uploadFile(MultipartFile file) {

        try {

            String fileName = file.getOriginalFilename();

            Path uploadPath = Paths.get(storagePath);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path targetPath = uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    targetPath
            );

            FileNode fileNode = new FileNode();

            fileNode.setName(fileName);
            fileNode.setPath(targetPath.toString());
            fileNode.setMimeType(file.getContentType());
            fileNode.setSize(file.getSize());
            fileNode.setIsFolder(false);
            fileNode.setParentId(null);

            FileNode saved = repository.save(fileNode);

            return new UploadResponse(
                    saved.getId(),
                    saved.getName(),
                    saved.getPath()
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload file",
                    e
            );

        }
    }

    @Override
    public List<FileNodeResponse> getAllFiles() {

        return repository.findAll()
                .stream()
                .map(fileNode -> new FileNodeResponse(
                        fileNode.getId(),
                        fileNode.getName(),
                        fileNode.getIsFolder(),
                        fileNode.getSize()
                ))
                .collect(Collectors.toList());
    }
}