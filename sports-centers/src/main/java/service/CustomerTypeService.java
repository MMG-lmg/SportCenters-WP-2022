package service;

import java.util.Collection;

import beans.CustomerType;
import repository.CustomerTypeRepository;
import util.IdGenerator;

public class CustomerTypeService implements InterfaceBase<CustomerType>{
	
	private CustomerTypeRepository repo;
	public CustomerTypeService() {
		repo = new CustomerTypeRepository();
	}
	
	@Override
	public Collection<CustomerType> getAll() {
		return repo.getAll();
	}

	@Override
	public CustomerType getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(CustomerType item) {
		String id = this.generateId();
		item.setId(id);
		repo.create(id, item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
	}

	@Override
	public void update(String id, CustomerType item) {
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
