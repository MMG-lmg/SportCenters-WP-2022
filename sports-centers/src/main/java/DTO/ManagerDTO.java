package DTO;

import java.time.LocalDate;
import java.util.Collection;

import beans.Gender;
import beans.Manager;
import beans.SportsCenter;
import beans.User;
import beans.UserRole;

public class ManagerDTO extends User{
	private String SportCenterTitle;

	public String getSportCenterTitle() {
		return SportCenterTitle;
	}

	public void setSportCenterTitle(String sportCenterTitle) {
		SportCenterTitle = sportCenterTitle;
	}

	public ManagerDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ManagerDTO(String userName, String password, String name, Gender gender, LocalDate dateOfBirth,
			UserRole role, String SportCenterTitle) {
		super(userName, password, name, gender, dateOfBirth, role);
		this.SportCenterTitle = SportCenterTitle;
		// TODO Auto-generated constructor stub
	}
	public Manager convertDTO(Collection<SportsCenter> centers) {
		for(SportsCenter sportsCenter : centers) {
			if(sportsCenter.getCenterTitle().equals(this.getSportCenterTitle())) {
				return new Manager(this.getUserName(),this.getPassword(),this.getName(),this.getGender(),this.getDateOfBirth(),this.getRole(),sportsCenter);
			}
		}
		return null;
	}
	public static ManagerDTO convertObject(Manager manager) {
		ManagerDTO dto = new ManagerDTO();
		dto.setUserName(manager.getUserName());
		dto.setName(manager.getName());
		dto.setPassword(manager.getPassword());
		dto.setDateOfBirth(manager.getDateOfBirth());
		dto.setGender(manager.getGender());
		dto.setRole(manager.getRole());
		if(manager.getCenter()!=null) {
			dto.setSportCenterTitle(manager.getCenter().getCenterTitle());
		}
		else {
			dto.setSportCenterTitle("Nema");
		}
		return dto;
	}
}
