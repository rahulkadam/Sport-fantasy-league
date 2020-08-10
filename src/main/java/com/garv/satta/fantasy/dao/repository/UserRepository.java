package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll();
    User findUserById(Long id);
    User findUserByName(String name);
    User findByEmail(String email);
    Boolean existsByEmail(String email);
}
