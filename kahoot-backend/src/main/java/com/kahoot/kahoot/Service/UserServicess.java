package com.kahoot.kahoot.Service;

import java.util.List;

import com.kahoot.kahoot.Entity.User;

public interface UserServicess {
    User createUser(User user);
    List<User> getAllUsers();
    User getUserById(Long userId);
    User updateUser(Long userId, User user);
    void deleteUser(Long userId);
    User getUserByUsernameAndPassword(String username, String password);
    User getUserByUsername(String username);
}
