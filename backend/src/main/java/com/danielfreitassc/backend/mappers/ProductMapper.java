package com.danielfreitassc.backend.mappers;

import org.mapstruct.Mapper;

import com.danielfreitassc.backend.dtos.ProductRequestDto;
import com.danielfreitassc.backend.dtos.ProductResponseDto;
import com.danielfreitassc.backend.models.ProductEntity;

@Mapper(componentModel="spring")
public interface ProductMapper {
    ProductRequestDto toCreate(ProductEntity productEntity);
    ProductResponseDto toResponse(ProductEntity productEntity);

    ProductEntity toEntity(ProductRequestDto productRequestDto);
}
