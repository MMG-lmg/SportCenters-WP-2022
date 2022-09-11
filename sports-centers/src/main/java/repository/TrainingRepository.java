package repository;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Coach;
import beans.SportsCenter;
import beans.Training;
import beans.User;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;
import util.ExclusionStrategies.CoachExclusionStrategy;
import util.ExclusionStrategies.SportsCenterExclusionStrategy;

public class TrainingRepository implements RepositoryBase<Training> {
	private HashMap<String,Training> trainingList;
	private String path = "data";
	private SportsCenterRepository sportsRepo;
	private CoachRepository coachRepo;
	public TrainingRepository() {
		trainingList = new HashMap<String,Training>();
		sportsRepo = new SportsCenterRepository();
		coachRepo = new CoachRepository();
	}
	public TrainingRepository(String path) {
		this.path=path;
	}
	
	@Override
	public Collection<Training> getAll() {
		readData();
		syncData();
		return trainingList.values();
	}
	public Set<String> getAllKeys() {
		// TODO Auto-generated method stub
		return trainingList.keySet();
	}
	@Override
	public Training getById(String id) {
		readData();
		syncData();
		return trainingList.get(id);
	}

	@Override
	public void create(String id, Training item) {
		trainingList.put(id, item);
		writeData();
		readData();
		syncData();
	}

	@Override
	public void delete(String id) {
		trainingList.remove(id);
		writeData();
		readData();
		syncData();
	}

	@Override
	public void update(String id, Training item) {
		trainingList.put(id, item);
		writeData();
		readData();
		syncData();
		
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).setExclusionStrategies(new SportsCenterExclusionStrategy(), new CoachExclusionStrategy()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/trainings.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,Training> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, Training>>(){}.getType());
			this.trainingList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).setExclusionStrategies(new SportsCenterExclusionStrategy(),new CoachExclusionStrategy()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/trainings.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.trainingList));
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
		Collection<SportsCenter> centers = sportsRepo.getAll();
		trainingList.forEach((id, training) ->{ 
			for(SportsCenter center : centers) {
				if(center.getCenterId().equals(training.getCenter().getCenterId())) {
					this.fillOutCenter(center,training);
					break;
				}
			}
		});
	}
	private void fillOutCenter(SportsCenter center, Training training) {
		training.setCenter(center);
	}
}
