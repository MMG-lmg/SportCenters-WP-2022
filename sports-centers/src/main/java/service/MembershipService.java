package service;

import java.util.Collection;

import beans.Membership;
import repository.MembershipRepository;
import util.IdGenerator;

public class MembershipService implements InterfaceBase<Membership>{
	private MembershipRepository repo;
	
	public MembershipService() {
		repo = new MembershipRepository();
	}
	@Override
	public Collection<Membership> getAll() {
		return repo.getAll();
	}

	@Override
	public Membership getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(Membership item) {
		String id = generateId();
		item.setMembershipId(id);
		repo.create(id, item);
		
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
		
	}

	@Override
	public void update(String id, Membership item) {
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
