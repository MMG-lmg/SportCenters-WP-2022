package repository;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

import beans.SportsCenter;
public class SportsCenterRepository implements RepositoryBase<SportsCenter> {
	private HashMap<String,SportsCenter> centersList;
	
	public SportsCenterRepository() {
		
	}
	public SportsCenterRepository(String path) {
		Gson gson = new Gson();
		BufferedReader in = null;
		try {
			File file = new File(path + "/sportsCenters.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			gson.fromJson(in, SportsCenter.class);
		} 
		catch(Exception e) {
			e.printStackTrace();
		}
		finally {
			if(in!=null) {
				try {
					in.close();
				}
				catch(Exception e) {}
			}
		}
	}
	public Collection<SportsCenter> getAll() {
		return centersList.values();
	}
	public SportsCenter getById(String id) {
		return centersList.get(id);
	}
	public void create(String id, SportsCenter item) {
		centersList.put(id, item);
		
	}
	public void delete(String id) {
		centersList.remove(id);	
	}
	public void update(String id, SportsCenter item) {
		centersList.put(id, item);
	}

}
