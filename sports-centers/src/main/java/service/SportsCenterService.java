package service;
import java.util.Collection;
import java.util.HashMap;

import beans.SportsCenter;
import repository.SportsCenterRepository;
import util.IdGenerator;

public class SportsCenterService implements InterfaceBase<SportsCenter> {

	private SportsCenterRepository repo;
	public SportsCenterService() {
		repo = new SportsCenterRepository();
	}
	@Override
	public Collection<SportsCenter> getAll() {
		return repo.getAll();
	}

	@Override
	public SportsCenter getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(SportsCenter item) {
		String id = generateId();
		item.setCenterId(id);
		repo.create(id, item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
		
	}

	@Override
	public void update(String id, SportsCenter item) {
		repo.update(id, item);
	}

	@Override
	public String generateId() {
		boolean unique = false;
        String newId = "";
        while (!unique)
        {
            newId = IdGenerator.generate();
            unique = isIdUnique(newId);
        }
        return newId;
	}

	@Override
	public boolean isIdUnique(String id) {
		boolean retVal = true;
		if(repo.getAll() != null) {
			
			if(repo.getAllKeys().contains(id)) retVal = false;
		}
		return retVal;
	}
}
