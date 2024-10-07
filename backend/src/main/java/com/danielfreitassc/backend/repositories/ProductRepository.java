package com.danielfreitassc.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.danielfreitassc.backend.models.ProductEntity;

public interface ProductRepository extends  JpaRepository<ProductEntity, Long> {

    @Query("SELECT p FROM ProductEntity p WHERE (:search IS NULL OR UPPER(p.name) LIKE CONCAT('%', UPPER(:search), '%'))")
    Page<ProductEntity> findAll(Pageable pageable,String search);
}
