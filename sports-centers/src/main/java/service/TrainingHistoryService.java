package service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import beans.Customer;
import beans.SportsCenter;
import beans.TrainingHistory;
import repository.TrainingHistoryRepository;
import util.IdGenerator;

public class TrainingHistoryService implements InterfaceBase<TrainingHistory>{
	private TrainingHistoryRepository repo;
	private CustomerService customerService;
	
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
	public Collection<TrainingHistory> getForCustomerDateLimited(String username){
		Collection<TrainingHistory> source = this.getForCustomer(username);
		Collection<TrainingHistory> retVal = new ArrayList<TrainingHistory>();
		for(TrainingHistory history : source) {
			if(!history.getDate().isBefore(LocalDateTime.now().minusMonths(1)) && !history.getDate().isAfter(LocalDateTime.now())) {
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
	public Collection<TrainingHistory> getForCenter(String centerId){
		Collection<TrainingHistory> retVal = new ArrayList<TrainingHistory>();
		for(TrainingHistory history : repo.getAll()) {
			if(history.getTraining().getCenter().getCenterId().equals(centerId)) {
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
		Customer customer =item.getCustomer();
		SportsCenter center = item.getTraining().getCenter();
		this.customerService = new CustomerService();
		if(customer.getVisitedCenters()!=null) {
			if(!customer.getVisitedCenters().contains(center)){
				this.addVisitedCenter(customer, center);
			}
		}
		else {
			this.addVisitedCenterEmpty(customer, center);
		}
	}
	private void addVisitedCenter(Customer customer, SportsCenter center) {
		List<SportsCenter> list = customer.getVisitedCenters();
		list.add(center);
		customer.setVisitedCenters(list);
		this.customerService.update(customer.getUserName(), customer);
	}
	private void addVisitedCenterEmpty(Customer customer, SportsCenter center) {
		List<SportsCenter> list = new ArrayList<SportsCenter>();
		list.add(center);
		customer.setVisitedCenters(list);
		this.customerService.update(customer.getUserName(), customer);
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
