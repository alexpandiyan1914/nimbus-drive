package com.nimbusdrive.backend.controller;

import com.nimbusdrive.backend.entity.FileNode;
import com.nimbusdrive.backend.repository.FileNodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private FileNodeRepository repository;

    @GetMapping("/")
    public String home() {
        return "NimbusDrive Backend Running...";
    }

    @GetMapping("/db-test")
    public String databaseTest() {

        FileNode folder = new FileNode();

        folder.setName("Documents");
        folder.setPath("storage/Documents");
        folder.setMimeType(null);
        folder.setSize(0L);
        folder.setIsFolder(true);
        folder.setParentId(null);

        repository.save(folder);

        return "Folder inserted successfully!";
    }

}