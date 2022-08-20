package beans;

import java.util.Date;

public class MembershipOffer {
	private String membershipOfferId;
	private String description;
	private MembershipType type;
	private double price;
	private int numOfVisits;
	
	public MembershipOffer() {}
	public MembershipOffer(String membershipOfferId,String description, MembershipType type, double price, int numOfVisits) {
		super();
		this.membershipOfferId = membershipOfferId;
		this.description = description;
		this.type = type;
		this.price = price;
		this.numOfVisits = numOfVisits;
	}
	public String getMembershipOfferId() {
		return membershipOfferId;
	}
	public void setMembershipOfferId(String membershipOfferId) {
		this.membershipOfferId = membershipOfferId;
	}
	public MembershipType getType() {
		return type;
	}
	public void setType(MembershipType type) {
		this.type = type;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getnumOfVisits() {
		return numOfVisits;
	}
	public void setnumOfVisits(int numOfVisits) {
		this.numOfVisits = numOfVisits;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
