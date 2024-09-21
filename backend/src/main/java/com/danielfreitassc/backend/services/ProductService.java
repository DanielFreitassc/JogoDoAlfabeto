package com.danielfreitassc.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public ProductResponseDto getById(Long id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if(product.isEmpty()) throw  new ResponseStatusException(HttpStatus.NOT_FOUND,"Nenhum produto econtrado");
        return productMapper.toResponse(product.get());
    }

    public ProductResponseDto update(Long id, ProductRequestDto productRequestDto) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if(product.isEmpty()) throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum produto econtrado");
        ProductEntity productEntity = productMapper.toEntity(productRequestDto);
        productEntity.setId(id);
        productRepository.save(productEntity);
        return  productMapper.toResponse(productEntity);
    }

    public ProductResponseDto delete(Long id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if(product.isEmpty()) throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum produto econtrado");
        productRepository.delete(product.get());
        return  productMapper.toResponse(product.get());
    }
}
