package com.univali.projetoM3.service;

import com.univali.projetoM3.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void add(User u);

    List<User> list();

    void delete(User u);

    Optional<User> findById(long userId);

    void deleteById(long userId);
}
