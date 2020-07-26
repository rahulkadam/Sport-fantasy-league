package com.garv.satta.fantasy.dto.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public abstract class Converter<E,D> {
    @Autowired
    public ModelMapper mapper;

    public abstract E convertToEntity(D dto);
    public abstract D convertToDTO(E entity);

    public abstract List<D> convertToDTOList(List<E> list);

    public List<D> mapToDTOList(final Collection<E> entityList, Class<D> outCLass) {
        return entityList.stream()
                .map(entity -> mapper.map(entity, outCLass))
                .collect(Collectors.toList());
    }
}
