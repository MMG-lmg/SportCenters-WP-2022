package beans;

import java.util.Date;

public class TrainingHistory {
	private String HistoryId;
	private Date signup;
	private Training training;
	private Customer customer;
	private Coach coach;
	public TrainingHistory() {
		super();
	}
	public TrainingHistory(String historyId, Date signup, Training training, Customer customer, Coach coach) {
		super();
		HistoryId = historyId;
		this.signup = signup;
		this.training = training;
		this.customer = customer;
		this.coach = coach;
	}
	public String getHistoryId() {
		return HistoryId;
	}
	public void setHistoryId(String historyId) {
		HistoryId = historyId;
	}
	public Date getSignup() {
		return signup;
	}
	public void setSignup(Date signup) {
		this.signup = signup;
	}
	public Training getTraining() {
		return training;
	}
	public void setTraining(Training training) {
		this.training = training;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Coach getCoach() {
		return coach;
	}
	public void setCoach(Coach coach) {
		this.coach = coach;
	}
}
