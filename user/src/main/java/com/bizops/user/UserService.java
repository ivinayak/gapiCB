package com.bizops.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
    private IUserRepository userRepo;
	
	public User findUser(String userName) {
		User user = userRepo.findByEmail(userName);
		return user;
	}
	
	public User createUser(User user) {
		User userSaved = userRepo.save(user);
		return userSaved;
	}
	
}
