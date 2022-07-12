package repository;

import java.util.function.Consumer;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import beans.User;

public class UserExclusionStrategy implements ExclusionStrategy {

	@Override
	public boolean shouldSkipField(FieldAttributes f) {
		return (f.getDeclaringClass() == User.class && f.getName().equals("password")) ||
				(f.getDeclaringClass() == User.class && f.getName().equals("name"))||
				(f.getDeclaringClass() == User.class && f.getName().equals("gender"))||
				(f.getDeclaringClass() == User.class && f.getName().equals("dateOfBirth"))||
				(f.getDeclaringClass() == User.class && f.getName().equals("role"));
	}

	@Override
	public boolean shouldSkipClass(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
