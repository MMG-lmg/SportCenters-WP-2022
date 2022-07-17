package service;

import java.util.Collection;

import beans.Manager;
import repository.ManagerRepository;

public class ManagerService implements InterfaceBase<Manager> {

	private ManagerRepository repo;
	public ManagerService() {
		repo = new ManagerRepository();
	}
	@Override
	public Collection<Manager> getAll() {
		return repo.getAll();
	}

	@Override
	public Manager getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(Manager item) {
		repo.create(item.getUserName(), item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
	}

	@Override
	public void update(String id, Manager item) {
		repo.update(id, item);
		
	}

	@Override
	public String generateId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isIdUnique(String id) {
		// TODO Auto-generated method stub
		return false;
	}

}
