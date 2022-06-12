package beans;

import java.util.Date;
import java.util.List;

public class Coach extends User{
	public Coach() {
		super();
	}

	public Coach(String userName, String password, String name, Gender gender, Date dateOfBirth, UserRole role,
			List<Training> pastTrainings) {
		super(userName, password, name, gender, dateOfBirth, role);
		this.pastTrainings = pastTrainings;
	}

	private List<Training> pastTrainings;

	public List<Training> getPastTrainings() {
		return pastTrainings;
	}

	public void setPastTrainings(List<Training> pastTrainings) {
		this.pastTrainings = pastTrainings;
	}
}
