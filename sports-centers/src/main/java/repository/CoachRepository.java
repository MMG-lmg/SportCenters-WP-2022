package repository;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Collection;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Coach;
import beans.Manager;
import beans.User;

public class CoachRepository implements RepositoryBase<Coach>{
	
	private UserRepository userRepo;
	private HashMap<String,Coach> coachList;
	private String path = "data";
			
	public CoachRepository() {
		coachList = new HashMap<String,Coach>();
		userRepo = new UserRepository();
		readData();
		syncData();
	}
	public CoachRepository(String path) {
		this.path = path;
	}
	@Override
	public Collection<Coach> getAll() {
		return coachList.values();
	}

	@Override
	public Coach getById(String id) {
		return coachList.get(id);
	}

	@Override
	public void create(String id, Coach item) {
		coachList.put(id, item);
		userRepo.create(id, new User(item.getUserName(),item.getPassword(),item.getName(),item.getGender(),item.getDateOfBirth(),item.getRole()));
		writeData();
		readData();
		syncData();
	}

	@Override
	public void delete(String id) {
		coachList.remove(id);
		userRepo.delete(id);
		writeData();
		readData();
		syncData();
		
	}

	@Override
	public void update(String id, Coach item) {
		coachList.put(id, item);
		userRepo.update(id, item);
		writeData();
		readData();
		syncData();
		
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().setExclusionStrategies(new UserExclusionStrategy()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/coaches.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,Coach> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, Coach>>(){}.getType());
			this.coachList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().setExclusionStrategies(new UserExclusionStrategy()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/coaches.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.coachList));
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
	public void syncData() {
		Collection<User> users = userRepo.getAll();
		
		coachList.forEach((id, coach) ->{ 
			for(User user : users) {
				if(user.getUserName().equals(id)) {
					this.fillOutCoach(coach,user);
				}
			}
		});
	}
	private void fillOutCoach(Coach coach, User user) {
		coach.setName(user.getName());
		coach.setDateOfBirth(user.getDateOfBirth());
		coach.setGender(user.getGender());
		coach.setPassword(user.getPassword());
		coach.setRole(user.getRole());
	}
	
}
