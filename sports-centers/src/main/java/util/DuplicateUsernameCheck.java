package util;

import beans.User;
import repository.UserRepository;

public class DuplicateUsernameCheck {
	private static UserRepository userRepo = new UserRepository();
	
	public static boolean isDuplicate(String username) {
		for(User user : userRepo.getAll()) {
			if(user.getUserName().equals(username)) return true;
		}
		return false;
	}
	
}
