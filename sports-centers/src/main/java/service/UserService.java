package service;

import java.util.Collection;

import beans.User;
import repository.UserRepository;

public class UserService implements InterfaceBase<User>{

	private UserRepository repo;
	
	public UserService() {
		repo = new UserRepository();
	}
	public Collection<User> getAll() {
		return repo.getAll();
	}

	public User getById(String id) {
		return repo.getById(id);
	}

	public void create(User item) {
		repo.create(item.getUserName(), item);
	}

	public void delete(String id) {
		repo.delete(id);
	}
	public void update(String id, User item) {
		repo.update(id, item);	
	}

	public String generateId() {
		// TODO Auto-generated method stub
		return null;
	}
	public boolean isIdUnique(String id) {
		// TODO Auto-generated method stub
		return false;
	}

}
