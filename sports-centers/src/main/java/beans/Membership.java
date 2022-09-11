package beans;

import java.time.LocalDate;
import java.util.Date;

public class Membership {
	private String membershipId;
	private MembershipType type;
	private LocalDate payDate;
	private LocalDate validDue;
	private double price;
	private Customer customer;
	private MembershipStatus status;
	private int numOfVisits;
	private int usedVisits;
	
	public Membership(String membershipId, MembershipType type, LocalDate payDate, LocalDate validDue, double price,
			Customer customer, MembershipStatus status, int numOfVisits) {
		super();
		this.membershipId = membershipId;
		this.type = type;
		this.payDate = payDate;
		this.validDue = validDue;
		this.price = price;
		this.customer = customer;
		this.status = status;
		this.numOfVisits = numOfVisits;
		this.usedVisits = 0;
	}
	public Membership() {
		super();
	}
	public String getMembershipId() {
		return membershipId;
	}
	public void setMembershipId(String membershipId) {
		this.membershipId = membershipId;
	}
	public MembershipType getType() {
		return type;
	}
	public void setType(MembershipType type) {
		this.type = type;
	}
	public LocalDate getPayDate() {
		return payDate;
	}
	public void setPayDate(LocalDate payDate) {
		this.payDate = payDate;
	}
	public LocalDate getValidDue() {
		return validDue;
	}
	public void setValidDue(LocalDate validDue) {
		this.validDue = validDue;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public MembershipStatus getStatus() {
		return status;
	}
	public void setStatus(MembershipStatus status) {
		this.status = status;
	}
	public int getNumOfVisits() {
		return numOfVisits;
	}
	public void setNumOfVisits(int numOfVisits) {
		this.numOfVisits = numOfVisits;
	}
	public int getUsedVisits() {
		return usedVisits;
	}
	public void setUsedVisits(int usedVisits) {
		this.usedVisits = usedVisits;
	}

}
