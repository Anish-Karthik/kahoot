package com.kahoot.kahoot.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kahoot.kahoot.Entity.User;
import com.kahoot.kahoot.Repository.UserRepository;
import com.kahoot.kahoot.Service.UserService;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // @PostMapping("/signup")
    // public ResponseEntity<String> signup(@RequestBody User user) {
    //     if (userRepository.findByUserName(user.getUserName()) != null)  {
    //         return ResponseEntity.badRequest().body("Username already exists");
    //     }

    //     // Additional validation and processing

    //     userRepository.save(user);
    //     return ResponseEntity.ok("Signup successful");
    // }

    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody User loginRequest) {
    //     User user = userRepository.findByUserName(loginRequest.getUserName());
    //     if (user == null || !user.getUserPassword().equals(loginRequest.getUserPassword())) {
    //         return ResponseEntity.badRequest().body("Invalid username or password");
    //     }

    //     // Additional logic like JWT token generation can be added here

    //     return ResponseEntity.ok("Login successful");
    // }

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
}