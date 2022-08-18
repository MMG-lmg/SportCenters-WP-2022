package repository;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import beans.Coach;
import beans.User;

public class CoachExclusionStrategy implements ExclusionStrategy{

	@Override
	public boolean shouldSkipField(FieldAttributes f) {
		return (f.getDeclaringClass() == Coach.class && f.getName().equals("password")) ||
				(f.getDeclaringClass() == Coach.class && f.getName().equals("name"))||
				(f.getDeclaringClass() == Coach.class && f.getName().equals("gender"))||
				(f.getDeclaringClass() == Coach.class && f.getName().equals("dateOfBirth"))||
				(f.getDeclaringClass() == Coach.class && f.getName().equals("role"))||
				(f.getDeclaringClass() == Coach.class && f.getName().equals("pastTrainings"));
	}

	@Override
	public boolean shouldSkipClass(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
