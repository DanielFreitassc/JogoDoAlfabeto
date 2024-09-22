package com.danielfreitassc.backend.dtos;

import java.math.BigDecimal;

public record ProductResponseDto(
    Long id,
    String image,
    String name,
    String description,
    int stock,
    BigDecimal price,
    boolean stockStatus
) {
    
}
