package com.danielfreitassc.backend.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.danielfreitassc.backend.dtos.ProductRequestDto;
import com.danielfreitassc.backend.dtos.ProductResponseDto;
import com.danielfreitassc.backend.mappers.ProductMapper;
import com.danielfreitassc.backend.models.ProductEntity;
import com.danielfreitassc.backend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    
    public ProductResponseDto create(ProductRequestDto productRequestDto) {
        ProductEntity productEntity = productMapper.toEntity(productRequestDto);
        productRepository.save(productEntity);
        return productMapper.toResponse(productEntity);
    }

    public List<ProductResponseDto> getAll(Pageable pageable) {
        Page<ProductEntity> productEntitys = productRepository.findAll(pageable);
        return productEntitys.stream().map(productMapper::toResponse).toList();
    }
}
