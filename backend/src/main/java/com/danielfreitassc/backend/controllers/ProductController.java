package com.danielfreitassc.backend.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.danielfreitassc.backend.dtos.ProductRequestDto;
import com.danielfreitassc.backend.dtos.ProductResponseDto;
import com.danielfreitassc.backend.services.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ProductResponseDto createProduct(@RequestBody @Valid ProductRequestDto productRequestDto) {
        return  productService.create(productRequestDto);
    }

    @GetMapping
    public Page<ProductResponseDto> getAll(Pageable pageable, @RequestParam(value="search", required=false) String search) {
        return productService.getAll(pageable, search);
    }

    @GetMapping("{id}")
    public ProductResponseDto getProductByid(@PathVariable Long id) {
      return  productService.getById(id);
    }

    @PutMapping("{id}")
    public ProductResponseDto updateProductById(@PathVariable Long id, @RequestBody @Valid ProductRequestDto productRequestDto) {
        return  productService.update(id, productRequestDto);
    }

    @DeleteMapping("{id}")
    public ProductResponseDto deleteProductById(@PathVariable Long id) {
        return productService.delete(id);
    }
}
