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

import beans.Manager;
import beans.SportsCenter;
import beans.User;
import util.ExclusionStrategies.SportsCenterExclusionStrategy;
import util.ExclusionStrategies.UserExclusionStrategy;

public class ManagerRepository implements RepositoryBase<Manager>{
	private UserRepository userRepo;
	private SportsCenterRepository centerRepo;
	private HashMap<String,Manager> managerList;
	private String path = "data";
	
	public ManagerRepository() {
		managerList = new HashMap<String,Manager>();
		userRepo = new UserRepository();
		centerRepo = new SportsCenterRepository();
		readData();
		syncData();
	}
	public ManagerRepository(String path) {
		this.path = path;
	}
	@Override
	public Collection<Manager> getAll() {
		return managerList.values();
	}

	@Override
	public Manager getById(String id) {
		return managerList.get(id);
	}

	@Override
	public void create(String id, Manager item) {
		managerList.put(id, item);
		userRepo.create(id, new User(item.getUserName(),item.getPassword(),item.getName(),item.getGender(),item.getDateOfBirth(),item.getRole()));
		writeData();
		readData();
		syncData();
	}

	@Override
	public void delete(String id) {
		managerList.remove(id);
		userRepo.delete(id);
		writeData();
		readData();
		syncData();
	}

	@Override
	public void update(String id, Manager item) {
		managerList.put(id, item);
		userRepo.update(id, item);
		writeData();
		readData();
		syncData();
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().setExclusionStrategies(new UserExclusionStrategy(), new SportsCenterExclusionStrategy()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/managers.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,Manager> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, Manager>>(){}.getType());
			this.managerList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().setExclusionStrategies(new UserExclusionStrategy(), new SportsCenterExclusionStrategy()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/managers.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.managerList));
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
		Collection<SportsCenter> centers = centerRepo.getAll();
		managerList.forEach((id, manager) ->{ 
			for(User user : users) {
				if(user.getUserName().equals(id)) {
					this.fillOutManager(manager,user);
				}
			}
			for(SportsCenter center : centers) {
				if(manager.getCenter()!=null) {
					if(center.getCenterId().equals(manager.getCenter().getCenterId())) {
						manager.setCenter(center);
					}
				}
			}
				
		});
	}
	private void fillOutManager(Manager manager, User user) {
		manager.setName(user.getName());
		manager.setDateOfBirth(user.getDateOfBirth());
		manager.setGender(user.getGender());
		manager.setPassword(user.getPassword());
		manager.setRole(user.getRole());
	}
}
