package com.danielfreitassc.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.danielfreitassc.backend.models.ProductEntity;

public interface ProductRepository extends  JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAll(Pageable pageable);
}
