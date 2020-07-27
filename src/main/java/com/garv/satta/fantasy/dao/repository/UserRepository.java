package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
