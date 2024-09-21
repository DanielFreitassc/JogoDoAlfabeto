package com.danielfreitassc.backend.dtos;

import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRequestDto(
    @NotBlank(message="O produto deve conter uma foto") String image,
    @NotBlank(message="Nome não pode estar em branco") String name,
    String type,
    @NotNull(message="Quantidade não pode ser nula") @Min(value=0,message="Quantidade não pode ser negativa") int stock,
    @NotNull(message="Preço não pode ser nulo") @Min(value=0,message="Preço não pode ser negativo") BigDecimal price,
    boolean stockStatus
) {
    
}
