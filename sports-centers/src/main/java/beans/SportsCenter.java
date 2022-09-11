package beans;

public class SportsCenter{
	private String centerId;
	private String centerTitle;
	private CenterTypes type;
	private CenterStatus status;
	private Location location;
	private String logoPath; //subject to change 
	private double grade;
	private int[] workHours;
	
	public SportsCenter() {
		super();
	}
	public SportsCenter(String centerId, String centerTitle, CenterTypes type, CenterStatus status, Location location,
			String logoPath, double grade, int[] workHours) {
		super();
		this.centerId = centerId;
		this.centerTitle = centerTitle;
		this.type = type;
		this.status = status;
		this.location = location;
		this.logoPath = logoPath;
		this.grade = grade;
		this.workHours = workHours;
	}
	public String getCenterId() {
		return centerId;
	}
	public void setCenterId(String centerId) {
		this.centerId = centerId;
	}
	public String getCenterTitle() {
		return centerTitle;
	}
	public void setCenterTitle(String centerTitle) {
		this.centerTitle = centerTitle;
	}
	public CenterTypes getType() {
		return type;
	}
	public void setType(CenterTypes type) {
		this.type = type;
	}
	public CenterStatus getStatus() {
		return status;
	}
	public void setStatus(CenterStatus status) {
		this.status = status;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getLogoPath() {
		return logoPath;
	}
	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}
	public double getGrade() {
		return grade;
	}
	public void setGrade(double grade) {
		this.grade = grade;
	}
	public int[] getWorkHours() {
		return workHours;
	}
	public void setWorkHours(int[] workHours) {
		this.workHours = workHours;
	}
	
}
