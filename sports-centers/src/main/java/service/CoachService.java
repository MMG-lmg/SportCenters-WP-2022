package service;

import java.util.Collection;

import beans.Coach;
import repository.CoachRepository;

public class CoachService implements InterfaceBase<Coach> {

	private CoachRepository repo;
	public CoachService() {
		repo = new CoachRepository();
	}
	@Override
	public Collection<Coach> getAll() {
		return repo.getAll();
	}

	@Override
	public Coach getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(Coach item) {
		repo.create(item.getUserName(), item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
	}

	@Override
	public void update(String id, Coach item) {
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
