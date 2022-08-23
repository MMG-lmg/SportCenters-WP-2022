package service;

import java.util.Collection;

import beans.Customer;
import repository.CustomerRepository;

public class CustomerService implements InterfaceBase<Customer>{

	private CustomerRepository repo;
	
	public CustomerService() {
		repo = new CustomerRepository();
	}
	@Override
	public Collection<Customer> getAll() {
		return repo.getAll();
	}

	@Override
	public Customer getById(String id) {
		return repo.getById(id);
	}

	@Override
	public void create(Customer item) {
		repo.create(item.getUserName(), item);
	}

	@Override
	public void delete(String id) {
		repo.delete(id);
	}

	@Override
	public void update(String id, Customer item) {
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
	public void saveLoyalityPoints(String id, double points) {
		Customer customer = repo.getById(id);
		customer.setLoyalityPoints(points);
		repo.update(id, customer);
	}
}
