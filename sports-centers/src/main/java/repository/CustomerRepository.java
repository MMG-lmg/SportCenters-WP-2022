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

import beans.Customer;
import beans.User;
import util.ExclusionStrategies.SportsCenterExclusionStrategy;
import util.ExclusionStrategies.UserExclusionStrategy;


public class CustomerRepository implements RepositoryBase<Customer>{
	private UserRepository userRepo;
	private HashMap<String,Customer> customerList;
	private String path = "data";
	
	public CustomerRepository() {
		customerList = new HashMap<String,Customer>();
		userRepo = new UserRepository();
		readData();
		syncData();
	}
	public CustomerRepository(String path) {
		this.path = path;
	}
	@Override
	public Collection<Customer> getAll() {
		readData();
		syncData();
		return customerList.values();
	}

	@Override
	public Customer getById(String id) {
		readData();
		syncData();
		return customerList.get(id);
	}

	@Override
	public void create(String id, Customer item) {
		customerList.put(id,item);
		userRepo.create(id, new User(item.getUserName(),item.getPassword(),item.getName(),item.getGender(),item.getDateOfBirth(),item.getRole()));
		writeData();
		readData();
		syncData();
	}

	@Override
	public void delete(String id) {
		customerList.remove(id);
		userRepo.delete(id);
		writeData();
		readData();
		syncData();
		
	}

	@Override
	public void update(String id, Customer item) {
		customerList.put(id, item);
		userRepo.update(id, item);
		writeData();
		readData();
		syncData();
		
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().setExclusionStrategies(new UserExclusionStrategy(), new SportsCenterExclusionStrategy()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/consumers.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,Customer> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, Customer>>(){}.getType());
			this.customerList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().setExclusionStrategies(new UserExclusionStrategy(),new SportsCenterExclusionStrategy()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/consumers.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.customerList));
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
		
		customerList.forEach((id, customer) ->{ 
			for(User user : users) {
				if(user.getUserName().equals(id)) {
					this.fillOutCustomer(customer,user);
				}
			}
		});
	}
	private void fillOutCustomer(Customer customer, User user) {
		customer.setName(user.getName());
		customer.setDateOfBirth(user.getDateOfBirth());
		customer.setGender(user.getGender());
		customer.setPassword(user.getPassword());
		customer.setRole(user.getRole());
	}
}
