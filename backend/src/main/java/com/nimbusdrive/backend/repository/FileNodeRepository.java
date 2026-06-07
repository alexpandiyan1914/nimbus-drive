package com.nimbusdrive.backend.repository;

import com.nimbusdrive.backend.entity.FileNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileNodeRepository extends JpaRepository<FileNode, Long> {

}