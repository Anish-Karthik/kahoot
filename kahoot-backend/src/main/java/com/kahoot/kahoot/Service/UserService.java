package com.kahoot.kahoot.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kahoot.kahoot.Entity.User;
import com.kahoot.kahoot.Repository.UserRepository;
@Service
public class UserService implements UserServicess{
  @Autowired
  private UserRepository userRepository;

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }
  
  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public User getUserById(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  @Override
  public User getUserByUsername(String username) {
    return userRepository.findByUserName(username);
  }

  @Override
  public User updateUser(Long userId, User user) {
    User existingUser = userRepository.findById(userId).orElse(null);
    if (existingUser == null) {
      return null;
    }
    existingUser.setUserName(user.getUserName());
    existingUser.setUserPassword(user.getUserPassword());
    return userRepository.save(existingUser);
  }

  @Override
  public void deleteUser(Long userId) {
    userRepository.deleteById(userId);
  }

  @Override
  public User getUserByUsernameAndPassword(String username, String password) {
    return userRepository.findByUserNameAndUserPassword(username, password);
  }
}
