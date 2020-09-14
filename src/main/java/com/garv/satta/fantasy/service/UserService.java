package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.UserRepository;
import com.garv.satta.fantasy.dto.UserDTO;
import com.garv.satta.fantasy.dto.converter.UserConverter;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter converter;

    @Autowired
    private UserService userService;

    public List<UserDTO> getUserList() {
        List<User> userList = (List) userRepository.findAll();
        return converter.convertToDTOList(userList);
    }

    public UserDTO getUserByMe() {
        Long id = userService.getCurrentUserId();
        return getUserById(id);
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

    public Long getCurrentUserId() {
        OAuth2User principal = (OAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Assert.notNull(principal, "User is Not Authenticated");
        Long id = principal.getAttribute("id");
        Assert.notNull(id, "User is Not Authenticated");
        return id;
    }

    public Long getAuthenticatedUserId() {
        try {
            return getCurrentUserId();
        } catch (Exception e) {
            return null;
        }
    }

}
