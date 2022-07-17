package repository;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import beans.SportsCenter;


public class SportsCenterExclusionStrategy implements ExclusionStrategy {

	@Override
	public boolean shouldSkipField(FieldAttributes f) {
		return (f.getDeclaringClass() == SportsCenter.class && f.getName().equals("centerTitle") ||
				f.getDeclaringClass() == SportsCenter.class && f.getName().equals("type") ||
				f.getDeclaringClass() == SportsCenter.class && f.getName().equals("status") ||
				f.getDeclaringClass() == SportsCenter.class && f.getName().equals("location") ||
				f.getDeclaringClass() == SportsCenter.class && f.getName().equals("logoPath") ||
				f.getDeclaringClass() == SportsCenter.class && f.getName().equals("grade") ||
				f.getDeclaringClass() == SportsCenter.class && f.getName().equals("workHours"));
	}

	@Override
	public boolean shouldSkipClass(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
