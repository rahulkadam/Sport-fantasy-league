package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.UserRepository;
import com.garv.satta.fantasy.dto.UserDTO;
import com.garv.satta.fantasy.dto.converter.UserConverter;
import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter converter;

    public List<UserDTO> getUserList() {
        List<User> userList = (List) userRepository.findAll();
        return converter.convertToDTOList(userList);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findUserById(id);
        return converter.convertToDTO(user);

    }

    public UserDTO createUser(UserDTO dto) {
        User user = converter.convertToEntity(dto);
        user = userRepository.save(user);
        return converter.convertToDTO(user);
    }

}
