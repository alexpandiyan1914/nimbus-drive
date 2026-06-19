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
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;

import java.nio.file.DirectoryStream;

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
    public List<FileNodeResponse> getFiles(Long parentId) {

        List<FileNode> fileNodes;

        if (parentId == null) {

            fileNodes = repository.findByParentIdIsNull();

        } else {

            fileNodes = repository.findByParentId(parentId);

        }

        return fileNodes.stream()
                .map(fileNode -> new FileNodeResponse(
                        fileNode.getId(),
                        fileNode.getName(),
                        fileNode.getIsFolder(),
                        fileNode.getSize()))
                .toList();
    }

    private void deleteRecursively(File file) {

        if (file.isDirectory()) {

            File[] children = file.listFiles();

            if (children != null) {

                for (File child : children) {
                    deleteRecursively(child);
                }

            }
        }

        boolean deleted = file.delete();

        if (!deleted) {
            throw new RuntimeException(
                    "Failed to delete file" + file.getAbsolutePath()
            );
        }
    }

    @Override
    public void deleteFile(Long id) {

        FileNode fileNode = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("File not found"));

        File physicalFile = new File(fileNode.getPath());

        if (physicalFile.exists()) {
            deleteRecursively(physicalFile);
        }

        repository.deleteById(id);
    }

    @Override
    public Resource downloadFile(Long id) {

        try {

            FileNode fileNode = repository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("File not found"));

            Path filePath = Paths.get(fileNode.getPath());

            Resource resource = new UrlResource(
                    filePath.toUri()
            );

            if (!resource.exists()) {
                throw new RuntimeException(
                        "Physical file not found"
                );
            }

            return resource;

        } catch (MalformedURLException e) {

            throw new RuntimeException(
                    "Failed to load file",
                    e
            );

        }
    }
}