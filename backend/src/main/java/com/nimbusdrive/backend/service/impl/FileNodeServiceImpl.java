package com.nimbusdrive.backend.service.impl;

import com.nimbusdrive.backend.dto.CreateFolderRequest;
import com.nimbusdrive.backend.dto.PreviewResponse;
import com.nimbusdrive.backend.entity.FileNode;
import com.nimbusdrive.backend.exception.ResourceNotFoundException;
import com.nimbusdrive.backend.repository.FileNodeRepository;
import com.nimbusdrive.backend.service.FileNodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.query.PartTreeJpaQuery;
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

        try {

            Path folderPath;

            if (request.getParentId() == null) {

                folderPath = Paths.get("../storage")
                        .resolve(request.getName());

            } else {

                FileNode parentFolder = repository.findById(
                        request.getParentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException("Parent folder not found"));

                folderPath = Paths.get(parentFolder.getPath())
                        .resolve(request.getName());
            }

            Files.createDirectories(folderPath);

            FileNode fileNode = new FileNode();

            fileNode.setName(request.getName());
            fileNode.setPath(folderPath.toString());
            fileNode.setMimeType(null);
            fileNode.setSize(0L);
            fileNode.setIsFolder(true);
            fileNode.setParentId(request.getParentId());


            return repository.save(fileNode);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to create folder",
                    e
            );
        }
    }

    @Override
    public UploadResponse uploadFile(MultipartFile file, Long parentId) {

        try {

            String fileName = file.getOriginalFilename();

            Path uploadPath;

            if (parentId == null) {
                uploadPath = Paths.get("../storage");
            } else {

                FileNode parentFolder = repository.findById(parentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Parent folder not found"));

                uploadPath = Paths.get(parentFolder.getPath());
            }

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(file.getOriginalFilename())
            );

            FileNode fileNode = new FileNode();

            fileNode.setName(fileName);
            fileNode.setPath(uploadPath.resolve(file.getOriginalFilename()).toString());
            fileNode.setMimeType(file.getContentType());
            fileNode.setSize(file.getSize());
            fileNode.setIsFolder(false);
            fileNode.setParentId(parentId);

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
                        new ResourceNotFoundException("File not found"));

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
                            new ResourceNotFoundException("File not found"));

            Path filePath = Paths.get(fileNode.getPath());

            Resource resource = new UrlResource(
                    filePath.toUri()
            );

            if (!resource.exists()) {
                throw new ResourceNotFoundException(
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

    @Override
    public List<FileNodeResponse> searchFiles(String keyword){

        List<FileNode> fileNodes = repository.findByNameContainingIgnoreCase(keyword);

        return fileNodes.stream()
                .map(fileNode -> new FileNodeResponse(
                        fileNode.getId(),
                        fileNode.getName(),
                        fileNode.getIsFolder(),
                        fileNode.getSize()
                )).toList();
    }

    @Override
    public PreviewResponse previewFile(Long id){
        try{
            FileNode fileNode = repository.findById(id)
                    .orElseThrow(()->
                            new ResourceNotFoundException("file not found"));

            Path filePath = Paths.get(fileNode.getPath());

            Resource resource = new UrlResource(
                    filePath.toUri()
            );

            if(!resource.exists()){
                throw new ResourceNotFoundException("physical file not found");
            }

            return new PreviewResponse(
                    resource,
                    fileNode.getMimeType()
            );
        }catch(MalformedURLException e){
            throw new RuntimeException("failed to load", e);

        }
    }
}