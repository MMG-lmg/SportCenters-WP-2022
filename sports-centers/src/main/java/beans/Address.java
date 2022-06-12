package beans;

public class Address {
	public Address() {
		super();
	}
	public Address(String street, String streetNumber, String city, String zipCode) {
		super();
		this.street = street;
		this.streetNumber = streetNumber;
		this.city = city;
		this.zipCode = zipCode;
	}
	private String street;
	private String streetNumber;
	private String city;
	private String zipCode;
	
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getStreetNumber() {
		return streetNumber;
	}
	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	@Override
	public String toString() {
		return this.street + " " + this.streetNumber +", "+ this.city +" "+ this.zipCode;
	}
}
