package beans;

public class CustomerType {
	public CustomerType() {
		super();
	}
	private CustomerTypeNames type;
	public CustomerType(CustomerTypeNames type, double discount, int pointsNeeded) {
		super();
		this.type = type;
		this.discount = discount;
		this.pointsNeeded = pointsNeeded;
	}
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
}
