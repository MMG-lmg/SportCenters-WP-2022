package beans;

import java.time.LocalDateTime;

public class TrainingHistory {
	private String HistoryId;
	private LocalDateTime date;
	private Training training;
	private Customer customer;
	private Coach coach;
	public TrainingHistory() {
		super();
	}
	public TrainingHistory(String historyId, LocalDateTime date, Training training, Customer customer, Coach coach) {
		super();
		HistoryId = historyId;
		this.date = date;
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
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
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
