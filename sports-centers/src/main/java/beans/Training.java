package beans;

public class Training {
	private String trainingId;
	private String title;
	private TrainingType type;
	private SportsCenter center;
	private double durationMins;
	private Coach coach;
	private String description;
	private String imagePath;
	public Training() {
		super();
	}
	public Training(String trainingId, String title, TrainingType type, SportsCenter center, double durationMins, Coach coach,
			String description, String imagePath) {
		super();
		this.trainingId = trainingId;
		this.title = title;
		this.type = type;
		this.center = center;
		this.durationMins = durationMins;
		this.coach = coach;
		this.description = description;
		this.imagePath = imagePath;
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
	public SportsCenter getCenter() {
		return center;
	}
	public void setCenter(SportsCenter center) {
		this.center = center;
	}
	public double getDurationMins() {
		return durationMins;
	}
	public void setDurationMins(double durationMins) {
		this.durationMins = durationMins;
	}
	public Coach getCoach() {
		return coach;
	}
	public void setCoach(Coach coach) {
		this.coach = coach;
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
	public TrainingType getType() {
		return type;
	}
	public void setType(TrainingType type) {
		this.type = type;
	}
}
