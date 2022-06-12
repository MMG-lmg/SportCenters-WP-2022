package beans;

import java.util.Date;

public class Manager extends User{
	private SportsCenter center;

	public Manager() {
		super();
	}

	public SportsCenter getCenter() {
		return center;
	}

	public Manager(String userName, String password, String name, Gender gender, Date dateOfBirth, UserRole role,
			SportsCenter center) {
		super(userName, password, name, gender, dateOfBirth, role);
		this.center = center;
	}

	public void setCenter(SportsCenter center) {
		this.center = center;
	}
}
