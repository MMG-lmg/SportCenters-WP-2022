package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class Customer extends User{
	
	public Customer() {
		super();
	}
	public Customer(String userName, String password, String name, Gender gender, LocalDate dateOfBirth, UserRole role,
			double membershipCost, List<SportsCenter> visitedCenters, double loyalityPoints, CustomerType type) {
		super(userName, password, name, gender, dateOfBirth, role);
		this.membershipCost = membershipCost;
		this.visitedCenters = visitedCenters;
		this.loyalityPoints = loyalityPoints;
		this.type = type;
	}
	private double membershipCost;
	private List<SportsCenter>visitedCenters;
	private double loyalityPoints;
	private CustomerType type;
	
	public double getMembershipCost() {
		return membershipCost;
	}
	public void setMembershipCost(double membershipCost) {
		this.membershipCost = membershipCost;
	}
	public List<SportsCenter> getVisitedCenters() {
		return visitedCenters;
	}
	public void setVisitedCenters(List<SportsCenter> visitedCenters) {
		this.visitedCenters = visitedCenters;
	}
	public double getLoyalityPoints() {
		return loyalityPoints;
	}
	public void setLoyalityPoints(double loyalityPoints) {
		this.loyalityPoints = loyalityPoints;
	}
	public CustomerType getType() {
		return type;
	}
	public void setType(CustomerType type) {
		this.type = type;
	}
	
}
