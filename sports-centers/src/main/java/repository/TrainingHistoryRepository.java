package repository;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Coach;
import beans.Customer;
import beans.SportsCenter;
import beans.Training;
import beans.TrainingHistory;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;
import util.LocalDateTimeAdapterDeserialiser;
import util.LocalDateTimeAdapterSerialiser;

public class TrainingHistoryRepository implements RepositoryBase<TrainingHistory> {
	
	private HashMap<String,TrainingHistory> trainingHistoryList;
	private String path = "data";
	private TrainingRepository trainingRepo;
	private CustomerRepository customerRepo;
	private CoachRepository coachRepo;
	public TrainingHistoryRepository() {
		trainingHistoryList = new HashMap<String,TrainingHistory>();
		trainingRepo = new TrainingRepository();
		customerRepo = new CustomerRepository();
		coachRepo = new CoachRepository();
	}
	public TrainingHistoryRepository(String path) {
		this.path = path;
	}
	@Override
	public Collection<TrainingHistory> getAll() {
		readData();
		syncData();
		return trainingHistoryList.values();
	}
	public Set<String> getAllKeys() {
		// TODO Auto-generated method stub
		return trainingHistoryList.keySet();
	}
	@Override
	public TrainingHistory getById(String id) {
		readData();
		syncData();
		return trainingHistoryList.get(id);
	}
	@Override
	public void create(String id, TrainingHistory item) {
		trainingHistoryList.put(id, item);
		writeData();
		readData();
		syncData();
		
	}
	@Override
	public void delete(String id) {
		trainingHistoryList.remove(id);
		writeData();
		readData();
		syncData();
	}
	@Override
	public void update(String id, TrainingHistory item) {
		trainingHistoryList.put(id, item);
		writeData();
		readData();
		syncData();
		
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterDeserialiser()).setExclusionStrategies(new CustomerExclusionStrategy(), new CoachExclusionStrategy(), new TrainingExclusionStrategy()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/trainingHistories.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,TrainingHistory> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, TrainingHistory>>(){}.getType());
			this.trainingHistoryList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterSerialiser()).setExclusionStrategies(new CustomerExclusionStrategy(), new CoachExclusionStrategy(), new TrainingExclusionStrategy()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/trainingHistories.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.trainingHistoryList));
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
		Collection<Training> trainings = trainingRepo.getAll();
		Collection<Customer> customers = customerRepo.getAll();
		Collection<Coach> coaches = coachRepo.getAll();
		
		trainingHistoryList.forEach((id, history) ->{ 
			for(Training training : trainings) {
				if(training.getTrainingId().equals(history.getTraining().getTrainingId())) {
					history.setTraining(training);
					break;
				}
			}
			for(Customer customer : customers) {
				if(customer.getUserName().equals(history.getCustomer().getUserName())) {
					history.setCustomer(customer);
					break;
				}
			}
			for(Coach coach : coaches) {
				if(coach.getUserName().equals(history.getCoach().getUserName())) {
					history.setCoach(coach);
					break;
				}
			}
		});	
	}
}
