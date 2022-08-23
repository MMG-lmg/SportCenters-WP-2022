package repository;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import beans.Customer;
import beans.User;

public class CustomerExclusionStrategy implements ExclusionStrategy {

	@Override
	public boolean shouldSkipField(FieldAttributes f) {
		return (f.getDeclaringClass() == User.class && f.getName().equals("password")) ||
				(f.getDeclaringClass() == User.class && f.getName().equals("name"))||
				(f.getDeclaringClass() == User.class && f.getName().equals("gender"))||
				(f.getDeclaringClass() == User.class && f.getName().equals("dateOfBirth"))||
				(f.getDeclaringClass() == User.class && f.getName().equals("role"))||
				(f.getDeclaringClass() == Customer.class && f.getName().equals("membershipCost"))||
				(f.getDeclaringClass() == Customer.class && f.getName().equals("visitedCenters"))||
				(f.getDeclaringClass() == Customer.class && f.getName().equals("loyalityPoints"))||
				(f.getDeclaringClass() == Customer.class && f.getName().equals("type"));
	}

	@Override
	public boolean shouldSkipClass(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
