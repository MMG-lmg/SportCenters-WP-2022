package beans;

import java.util.Date;

public class MembershipOffer {
	private String membershipOfferId;
	private String description;
	private MembershipType type;
	private double price;
	private int dailyVisits;
	
	public MembershipOffer() {}
	public MembershipOffer(String membershipOfferId,String description, MembershipType type, double price, int dailyVisits) {
		super();
		this.membershipOfferId = membershipOfferId;
		this.description = description;
		this.type = type;
		this.price = price;
		this.dailyVisits = dailyVisits;
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
	public int getDailyVisits() {
		return dailyVisits;
	}
	public void setDailyVisits(int dailyVisits) {
		this.dailyVisits = dailyVisits;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
