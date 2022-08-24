package repository;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import beans.Training;
import beans.User;

public class TrainingExclusionStrategy implements ExclusionStrategy{

	@Override
	public boolean shouldSkipField(FieldAttributes f) {
		return (f.getDeclaringClass() == Training.class && f.getName().equals("title")) ||
				(f.getDeclaringClass() == Training.class && f.getName().equals("type"))||
				(f.getDeclaringClass() == Training.class && f.getName().equals("center"))||
				(f.getDeclaringClass() == Training.class && f.getName().equals("durationMins"))||
				(f.getDeclaringClass() == Training.class && f.getName().equals("coach")) ||
				(f.getDeclaringClass() == Training.class && f.getName().equals("description")) ||
				(f.getDeclaringClass() == Training.class && f.getName().equals("imagePath"));
	}

	@Override
	public boolean shouldSkipClass(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
