package com.bizops.user;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
 
@Controller
public class AppController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public @ResponseBody User processRegister(@RequestBody User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(generateRandomPassword(10));
        user.setPassword(encodedPassword);
        User savedUser = userService.createUser(user);         
        return savedUser;
    }
    
    public static String generateRandomPassword(int len) {
		String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi"
          +"jklmnopqrstuvwxyz!@#$%&";
		Random rnd = new Random();
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++)
			sb.append(chars.charAt(rnd.nextInt(chars.length())));
		return sb.toString();
	}
    
    @GetMapping(value = "/findUser/{userName}", produces = "application/json")
    public @ResponseBody User findUser(@PathVariable("userName") String userName) {
    	User user = userService.findUser(userName);
		return user;
    	
    }
    
}
