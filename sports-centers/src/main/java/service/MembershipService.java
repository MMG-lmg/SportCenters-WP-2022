package service;

import java.util.ArrayList;
import java.util.Collection;

import beans.Membership;
import beans.MembershipStatus;
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
	public Collection<Membership> getByUsername(String username){
		Collection<Membership> retVal = new ArrayList<Membership>();
		for(Membership membership : repo.getAll()) {
			if(membership.getCustomer().getUserName().equals(username)) {
				retVal.add(membership);
			}
		}
		return retVal;
	}
	public Membership getActiveByUsername(String username) {
		for(Membership membership : this.getByUsername(username)) {
			if(membership.getStatus().equals(MembershipStatus.ACTIVE)) return membership;
		}
		return null;
	}
	@Override
	public void create(Membership item) {
		String id = generateId();
		item.setMembershipId(id);
		checkExistingMemberships(item.getCustomer().getUserName());
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
	private void checkExistingMemberships(String username) {
		Membership active = this.getActiveByUsername(username);
		if(!active.equals(null)) {
			active.setStatus(MembershipStatus.INACTIVE);
			repo.update(active.getMembershipId(), active);
		}	
	}
}
