package com.danielfreitassc.backend.dtos;

import java.math.BigDecimal;

public record ProductResponseDto(
    Long id,
    String image,
    String name,
    String type,
    int stock,
    BigDecimal price,
    boolean stockStatus
) {
    
}
