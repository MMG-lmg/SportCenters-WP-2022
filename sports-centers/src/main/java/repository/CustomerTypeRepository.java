package repository;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Coach;
import beans.CustomerType;
import util.LocalDateTimeAdapterDeserialiser;
import util.LocalDateTimeAdapterSerialiser;

public class CustomerTypeRepository implements RepositoryBase<CustomerType>{
	private HashMap<String,CustomerType> typesList;
	private String path = "data";

	public CustomerTypeRepository() {
		typesList = new HashMap<String,CustomerType>();
		readData();
	}
	public CustomerTypeRepository(String path) {
		this.path = path;
	}
	@Override
	public Collection<CustomerType> getAll() {
		return typesList.values();
	}

	@Override
	public CustomerType getById(String id) {
		return typesList.get(id);
	}
	public Set<String> getAllKeys(){
		return typesList.keySet();
	}
	@Override
	public void create(String id, CustomerType item) {
		typesList.put(id, item);
		writeData();
		readData();
	}

	@Override
	public void delete(String id) {
		typesList.remove(id);
		writeData();
		readData();
	}

	@Override
	public void update(String id, CustomerType item) {
		typesList.put(id, item);
		writeData();
		readData();
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/customerTypes.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,CustomerType> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, CustomerType>>(){}.getType());
			this.typesList = fromJson;

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
			File file = new File(this.path + "/customerTypes.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.typesList));
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
