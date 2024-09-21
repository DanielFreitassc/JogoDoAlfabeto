package com.danielfreitassc.backend.dtos;

import java.math.BigDecimal;

public record ProductResponseDto(
    Long id,
    String name,
    String type,
    int stock,
    BigDecimal price,
    boolean stockStatus
) {
    
}
