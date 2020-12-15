package com.univali.projetoM3.service;

import com.univali.projetoM3.dao.UserDAO;
import com.univali.projetoM3.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDAO dao;

    @Override
    public void add(User u) {
        dao.save(u);
    }

    @Override
    public List<User> list() {
        return dao.findAll();
    }

    @Override
    public void delete(User u) {
        dao.delete(u);
    }

    @Override
    public Optional<User> findById(long userId) {
        return dao.findById(userId);
    }

    @Override
    public void deleteById(long userId) {
        dao.deleteById(userId);
    }
}
