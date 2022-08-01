package service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import beans.CenterStatus;
import beans.Manager;
import beans.SportsCenter;
import repository.SportsCenterRepository;
import util.IdGenerator;

public class SportsCenterService implements InterfaceBase<SportsCenter> {

	private SportsCenterRepository repo;
	private ManagerService managerService;
	public SportsCenterService() {
		repo = new SportsCenterRepository();
		managerService = new ManagerService();
	}
	@Override
	public Collection<SportsCenter> getAll() {
		return this.syncStatusAll();
	}

	@Override
	public SportsCenter getById(String id) {
		return this.syncStatus(id);
	}
	public Collection<String> getAllWithoutManager(){
		Collection<SportsCenter> centers = repo.getAll();
		Collection<Manager> managersList = managerService.getAll();
		Collection<String> centerTitles = new ArrayList<String>();
		
		for(Manager man : managersList) {
			if(man.getCenter() != null) {
				if(centers.contains(man.getCenter())) {
					centers.remove(man.getCenter());
				}
			}
		}
		for(SportsCenter center : centers) {
			centerTitles.add(center.getCenterTitle());
		}
		return centerTitles;
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
	public Collection<SportsCenter> syncStatusAll() {
		Collection<SportsCenter> centers = repo.getAll();
		for(SportsCenter center : centers) {
			if(this.isOpen(center.getWorkHours())) {
				center.setStatus(CenterStatus.OPEN);
				
			}
			else {
				center.setStatus(CenterStatus.CLOSED);
			}
		}
		return centers;
	}
	public SportsCenter syncStatus(String id) {
		SportsCenter center = repo.getById(id);
		if(this.isOpen(center.getWorkHours())) {
			center.setStatus(CenterStatus.OPEN);
		}
		else {
			center.setStatus(CenterStatus.CLOSED);
		}
		return center;
	}
	
	private boolean isOpen (int[] workHours) {
		LocalDateTime startTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(workHours[0], 0));
		LocalDateTime endTime;
		if(workHours[1]==24) {
			endTime = LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(0, 0));
		}
		else {
			endTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(workHours[1], 0));
		}
		
		
		if(LocalDateTime.now().isAfter(startTime) &&  LocalDateTime.now().isBefore(endTime)) {
			return true;
			
		}
		else {
			return false;
		}
	}
}
