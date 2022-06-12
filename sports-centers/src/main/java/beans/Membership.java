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
}
