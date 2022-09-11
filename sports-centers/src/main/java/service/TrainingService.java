package service;

import java.util.ArrayList;
import java.util.Collection;

import beans.Training;
import repository.TrainingRepository;
import util.IdGenerator;

public class TrainingService implements InterfaceBase<Training>{
	private TrainingRepository repo;
	
	public TrainingService() {
		repo = new TrainingRepository();
	}
	@Override
	public Collection<Training> getAll() {
		// TODO Auto-generated method stub
		return repo.getAll();
	}

	@Override
	public Training getById(String id) {
		// TODO Auto-generated method stub
		return repo.getById(id);
	}
	public Collection<Training> getForCenterId(String id){
		Collection<Training> retVal = new ArrayList<Training>();
		for(Training training : repo.getAll()) {
			if(training.getCenter().getCenterId().equals(id)) {
				retVal.add(training);
			}
		}
		return retVal;
	}

	@Override
	public void create(Training item) {
		String id = generateId();
		item.setTrainingId(id);
		repo.create(id, item);
		
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
		
	}

	@Override
	public void update(String id, Training item) {
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
