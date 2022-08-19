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

import beans.Customer;
import beans.Membership;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class MembershipRepository implements RepositoryBase<Membership>{
	private HashMap<String,Membership> membershipList;
	private CustomerRepository customerRepo;
	private String path = "data";
	public MembershipRepository() {
		membershipList = new HashMap<String,Membership>();
		customerRepo = new CustomerRepository();
	}
	public MembershipRepository(String path) {
		this.path=path;
	}
	@Override
	public Collection<Membership> getAll() {
		readData();
		syncData();
		return membershipList.values();
	}

	@Override
	public Membership getById(String id) {
		readData();
		syncData();
		return membershipList.get(id);
	}

	@Override
	public void create(String id, Membership item) {
		membershipList.put(id, item);
		writeData();
		readData();
		syncData();
	}

	@Override
	public void delete(String id) {
		membershipList.remove(id);
		writeData();
		readData();
		syncData();
		
	}

	@Override
	public void update(String id, Membership item) {
		membershipList.put(id, item);
		writeData();
		readData();
		syncData();	
		
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).setExclusionStrategies(new CustomerExclusionStrategy()).create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/memberships.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,Membership> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, Membership>>(){}.getType());
			this.membershipList = fromJson;

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
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).setExclusionStrategies(new CustomerExclusionStrategy()).create();
		BufferedWriter out = null;
		try {
			File file = new File(this.path + "/memberships.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.membershipList));
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
		Collection<Customer> customers = customerRepo.getAll();
		
		membershipList.forEach((id, membership) ->{ 
			for(Customer customer : customers) {
				if(customer.getUserName().equals(membership.getCustomer().getUserName())) {
					membership.setCustomer(customer);
				}
			}
		});
	}
}
