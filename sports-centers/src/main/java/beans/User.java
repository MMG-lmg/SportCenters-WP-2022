package beans;

import java.util.Date;

public class User {
	public User() {
		super();
	}

	public User(String userName, String password, String name, Gender gender, Date dateOfBirth, UserRole role) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
	}

	private String userName;
	private String password;
	private String name;
	private Gender gender;
	private Date dateOfBirth;
	
	private UserRole role;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}
}
