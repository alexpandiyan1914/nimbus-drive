package com.nimbusdrive.backend.repository;

import com.nimbusdrive.backend.entity.FileNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileNodeRepository extends JpaRepository<FileNode, Long> {

    List<FileNode> findByParentId(Long parentId);

    List<FileNode> findByParentIdIsNull();

    List<FileNode> findByNameContainingIgnoreCase(String keyword);

}