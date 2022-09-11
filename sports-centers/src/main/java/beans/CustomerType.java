package beans;

public class CustomerType {
	public CustomerType() {
		super();
	}
	public CustomerType(String id, CustomerTypeNames type, double discount, int pointsNeeded) {
		super();
		this.id = id;
		this.type = type;
		this.discount = discount;
		this.pointsNeeded = pointsNeeded;
	}
	private String id;
	private CustomerTypeNames type;
	private double discount;
	private int pointsNeeded;
	
	public CustomerTypeNames getType() {
		return type;
	}
	public void setType(CustomerTypeNames type) {
		this.type = type;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public int getPointsNeeded() {
		return pointsNeeded;
	}
	public void setPointsNeeded(int pointsNeeded) {
		this.pointsNeeded = pointsNeeded;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
}
