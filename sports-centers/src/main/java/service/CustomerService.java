package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import beans.Customer;
import beans.CustomerType;
import beans.SportsCenter;
import repository.CustomerRepository;
import util.CustomerTypeSorter;

public class CustomerService implements InterfaceBase<Customer>{

	private CustomerRepository repo;
	private SportsCenterService centerService;
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
	public void visitCenter(String id, String centerId) {
		centerService = new SportsCenterService();
		Customer customer = repo.getById(id);
		SportsCenter center = centerService.getById(centerId);
		if(!customer.getVisitedCenters().contains(center)){
			List<SportsCenter> visitedCenters = customer.getVisitedCenters();
			visitedCenters.add(center);
			customer.setVisitedCenters(visitedCenters);
		}
	}
	public void updateCustomerPrice(String id, double price) {
		Customer customer = repo.getById(id);
		customer.setMembershipCost(price);
		this.update(customer.getUserName(), customer);
	}
	public void calculateType(String id) {
		Customer customer = repo.getById(id);
		CustomerTypeService typeService = new CustomerTypeService();
		ArrayList<CustomerType> types = (ArrayList<CustomerType>) typeService.getAll();
		Collections.sort(types, new CustomerTypeSorter());
		for(CustomerType type : types) {
			if(customer.getLoyalityPoints() > type.getPointsNeeded()) {
				customer.setType(type);
				this.update(customer.getUserName(),customer);
			}
		}
	}
}
