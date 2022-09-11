package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class Coach extends User{
	public Coach() {
		super();
	}

	public Coach(String userName, String password, String name, Gender gender, LocalDate dateOfBirth, UserRole role,
			List<TrainingHistory> pastTrainings) {
		super(userName, password, name, gender, dateOfBirth, role);
		this.pastTrainings = pastTrainings;
	}

	private List<TrainingHistory> pastTrainings;

	public List<TrainingHistory> getPastTrainings() {
		return pastTrainings;
	}

	public void setPastTrainings(List<TrainingHistory> pastTrainings) {
		this.pastTrainings = pastTrainings;
	}
}
