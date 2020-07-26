package com.garv.satta.fantasy.dto.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class Converter<E,D> {
    @Autowired
    public ModelMapper mapper;

    D.
    public abstract E convertToEntity(D dto);
    public abstract D convertToDTO(E entity);
}
