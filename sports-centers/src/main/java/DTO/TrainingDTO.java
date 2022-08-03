package DTO;

import java.util.Collection;

import beans.Coach;
import beans.Manager;
import beans.SportsCenter;
import beans.Training;

public class TrainingDTO {
	private String trainingId;
	private String title;
	private String centerId;
	private double durationMins;
	private String coachId;
	private String description;
	private String imagePath;
	
	public TrainingDTO(String trainingId, String title, String centerId, double durationMins, String coachId,
			String description, String imagePath) {
		super();
		this.trainingId = trainingId;
		this.title = title;
		this.centerId = centerId;
		this.durationMins = durationMins;
		this.coachId = coachId;
		this.description = description;
		this.imagePath = imagePath;
	}
	
	public TrainingDTO() {
		super();
	}
	public String getTrainingId() {
		return trainingId;
	}
	public void setTrainingId(String trainingId) {
		this.trainingId = trainingId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCenterId() {
		return centerId;
	}
	public void setCenterId(String centerId) {
		this.centerId = centerId;
	}
	public double getDurationMins() {
		return durationMins;
	}
	public void setDurationMins(double durationMins) {
		this.durationMins = durationMins;
	}
	public String getCoachId() {
		return coachId;
	}
	public void setCoachId(String coachId) {
		this.coachId = coachId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	public Training convertDTO(Collection<SportsCenter> centers, Collection<Coach> coaches) {
		SportsCenter centerHolder = null;
		Coach coachHolder =null;
		for(SportsCenter sportsCenter : centers) {
			if(sportsCenter.getCenterTitle().equals(this.getCenterId())) {
				centerHolder=sportsCenter;
			}
		}
		for(Coach coach : coaches) {
			if(coach.getUserName().equals(this.getCoachId())) {
				coachHolder = coach;
			}
		}
		if(centerHolder!=null && coachHolder!=null) {
			return new Training(
					this.getTrainingId(),
					this.getTitle(),
					centerHolder,
					this.getDurationMins(),
					coachHolder,
					this.getDescription(),
					this.getImagePath()
					);
					
		}
		else {
			return null;
		}
	}
	
}
