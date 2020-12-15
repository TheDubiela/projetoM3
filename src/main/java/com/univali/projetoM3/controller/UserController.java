package com.univali.projetoM3.controller;

import com.univali.projetoM3.entity.User;
import com.univali.projetoM3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService service;

    @RequestMapping("/users")
    public List<User> list() {
        return service.list();
    }

    @PostMapping("/users")
    public void save(@RequestBody User p) {
        service.add(p);
    }

    @DeleteMapping("/users/{idUser}")
    public void delete(@PathVariable long idUser) {
        service.deleteById(idUser);
    }

    @RequestMapping("/users/{idUser}")
    public User findById(@PathVariable long idUser) {
        return service.findById(idUser).get();
    }

    @PutMapping("/users/{idUser}")
    public void update(@PathVariable long idUser, @RequestBody User newUser) {
        Optional<User> oldUser = service.findById(idUser);
        if (oldUser.isPresent()) {
            User user = oldUser.get();
            user.setEmail(newUser.getEmail());
            user.setName(newUser.getName());
            user.setPass(newUser.getPass());
            service.add(user);
        }
    }
}
