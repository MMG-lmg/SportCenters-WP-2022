package service;

import java.util.ArrayList;
import java.util.Collection;

import beans.TrainingHistory;
import repository.TrainingHistoryRepository;
import util.IdGenerator;

public class TrainingHistoryService implements InterfaceBase<TrainingHistory>{
	private TrainingHistoryRepository repo;
	
	public TrainingHistoryService() {
		repo = new TrainingHistoryRepository();
	}
	
	@Override
	public Collection<TrainingHistory> getAll() {
		// TODO Auto-generated method stub
		return repo.getAll();
	}
	public Collection<TrainingHistory> getForCustomer(String username){
		Collection<TrainingHistory> retVal = new ArrayList<TrainingHistory>();
		for(TrainingHistory history : repo.getAll()) {
			if(history.getCustomer().getUserName().equals(username)) {
				retVal.add(history);
			}
		}
		return retVal;
	}
	public Collection<TrainingHistory> getForCoach(String username){
		Collection<TrainingHistory> retVal = new ArrayList<TrainingHistory>();
		for(TrainingHistory history : repo.getAll()) {
			if(history.getCoach().getUserName().equals(username)) {
				retVal.add(history);
			}
		}
		return retVal;
	}
	@Override
	public TrainingHistory getById(String id) {
		// TODO Auto-generated method stub
		return repo.getById(id);
	}

	@Override
	public void create(TrainingHistory item) {
		// TODO Auto-generated method stub
		String id = generateId();
		item.setHistoryId(id);
		repo.create(id, item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
		
	}

	@Override
	public void update(String id, TrainingHistory item) {
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
