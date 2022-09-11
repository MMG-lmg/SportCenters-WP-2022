package DTO;

import java.time.LocalDateTime;
import java.util.Collection;

import beans.Coach;
import beans.Customer;
import beans.Training;
import beans.TrainingHistory;

public class TrainingHistoryDTO {
	private String historyId;
	private LocalDateTime date;
	private String trainingId;
	private String customerId;
	private String coachId;
	
	public TrainingHistoryDTO(String historyId, LocalDateTime date, String trainingId, String customerId,
			String coachId) {
		super();
		this.historyId = historyId;
		this.date = date;
		this.trainingId = trainingId;
		this.customerId = customerId;
		this.coachId = coachId;
	}
	
	public String getHistoryId() {
		return historyId;
	}
	public void setHistoryId(String historyId) {
		this.historyId = historyId;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public String getTrainingId() {
		return trainingId;
	}
	public void setTrainingId(String trainingId) {
		this.trainingId = trainingId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getCoachId() {
		return coachId;
	}
	public void setCoachId(String coachId) {
		this.coachId = coachId;
	}
	public TrainingHistory convertDTO(Collection<Training> trainings, Collection<Coach> coaches, Collection<Customer> customers) {
		Coach coachHolder =null;
		Training trainingHolder = null;
		Customer customerHolder = null;
		
		for(Coach coach : coaches) {
			if(coach.getUserName().equals(this.coachId)) {
				coachHolder = coach;
				break;
			}
		}
		for(Training training : trainings) {
			if(training.getTrainingId().equals(this.trainingId)) {
				trainingHolder = training;
				break;
			}
		}
		for(Customer customer : customers) {
			if(customer.getUserName().equals(this.customerId)) {
				customerHolder = customer;
				break;
			}
		}
		
		if(customerHolder != null && trainingHolder != null && coachHolder != null) {
			return new TrainingHistory(this.historyId,this.date,trainingHolder,customerHolder,coachHolder);
		}
		return null;
	}
}
