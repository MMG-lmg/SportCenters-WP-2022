package beans;

import java.util.Date;

public class Membership {
	private String membershipId;
	private MembershipType type;
	private Date payDate;
	private Date validDue;
	private double price;
	private Customer customer;
	private MembershipStatus status;
	private int dailyVisits;
	
	public Membership(String membershipId, MembershipType type, Date payDate, Date validDue, double price,
			Customer customer, MembershipStatus status, int dailyVisits) {
		super();
		this.membershipId = membershipId;
		this.type = type;
		this.payDate = payDate;
		this.validDue = validDue;
		this.price = price;
		this.customer = customer;
		this.status = status;
		this.dailyVisits = dailyVisits;
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
	public Date getPayDate() {
		return payDate;
	}
	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}
	public Date getValidDue() {
		return validDue;
	}
	public void setValidDue(Date validDue) {
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
	public int getDailyVisits() {
		return dailyVisits;
	}
	public void setDailyVisits(int dailyVisits) {
		this.dailyVisits = dailyVisits;
	}

}
