package repository;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.stream.JsonWriter;

import beans.SportsCenter;
public class SportsCenterRepository implements RepositoryBase<SportsCenter> {
	private HashMap<String,SportsCenter> centersList;
	private String path = "data";
	public SportsCenterRepository() {
		centersList = new HashMap<String,SportsCenter>();
	}
	public SportsCenterRepository(String path) {
		this.path = path;
		
	}
	public Collection<SportsCenter> getAll() {
		readData();
		return centersList.values();
	}
	public Set<String> getAllKeys(){
		readData();
		return centersList.keySet();
	}
	public SportsCenter getById(String id) {
		readData();
		return centersList.get(id);
	}
	public void create(String id, SportsCenter item) {
		centersList.put(id, item);
		writeData();
	}
	public void delete(String id) {
		centersList.remove(id);	
		writeData();
	}
	public void update(String id, SportsCenter item) {
		centersList.put(id, item);
		writeData();
	}
	private void readData() {
		Gson gson = new Gson();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/sportsCenters.json");
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
	private void writeData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/sportsCenters.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.centersList));
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally{
			if(out!=null) {
				try{
					out.close();
				}
				catch(Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		
	}
}
