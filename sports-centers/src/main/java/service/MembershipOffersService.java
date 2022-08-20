package service;

import java.util.Collection;

import beans.MembershipOffer;
import repository.MembershipOffersRepository;
import util.IdGenerator;

public class MembershipOffersService implements InterfaceBase<MembershipOffer>{
	private MembershipOffersRepository repo;
	
	public MembershipOffersService() {
		repo = new MembershipOffersRepository();
	}
	@Override
	public Collection<MembershipOffer> getAll() {
		return repo.getAll();
	}

	@Override
	public MembershipOffer getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(MembershipOffer item) {
		String id = generateId();
		item.setMembershipOfferId(id);
		repo.create(null, item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
		
	}

	@Override
	public void update(String id, MembershipOffer item) {
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
