package repository;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.User;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class UserRepository implements RepositoryBase<User>{
	private HashMap<String,User> usersList;
	private String path = "data";
	
	public UserRepository() {
		usersList = new HashMap<String,User>();
		readData();
	}
	
	public UserRepository(String path) {
		this.path = path;
	}

	public Collection<User> getAll() {
		return usersList.values();
	}


	public User getById(String id) {
		return usersList.get(id);
	}


	public void create(String id, User item) {
		usersList.put(id, (User) item);
		writeData();
		readData();
	}

	public void delete(String id) {
		usersList.remove(id);	
		writeData();
		readData();
		
	}

	public void update(String id, User item) {
		usersList.put(id, (User) item);
		writeData();
		readData();
	}
	private void readData() {
		Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/users.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,User> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, User>>(){}.getType());
			this.usersList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/users.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.usersList));
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
