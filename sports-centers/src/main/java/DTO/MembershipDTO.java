package DTO;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

import beans.Customer;
import beans.Membership;
import beans.MembershipOffer;
import beans.MembershipStatus;

public class MembershipDTO extends MembershipOffer{
	private LocalDate payDate;
	private LocalDate validDue;
	private String customerUsername;
	private MembershipStatus status;
	
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
	public String getCustomerUsername() {
		return customerUsername;
	}
	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}
	public MembershipStatus getStatus() {
		return status;
	}
	public void setStatus(MembershipStatus status) {
		this.status = status;
	}
	
	public MembershipDTO() {
		super();
	}

	public Membership convertDTO(Collection<Customer> customers) {
		for(Customer customer : customers) {
			if(customer.getUserName().equals(this.getCustomerUsername())){
				return new Membership("",this.getType(),this.getPayDate(),this.getValidDue(),this.getPrice(),customer,this.getStatus(),this.getnumOfVisits());
			}
		}
		return null;
	}
	
}
