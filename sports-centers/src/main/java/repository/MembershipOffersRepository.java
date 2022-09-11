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

import beans.Membership;
import beans.MembershipOffer;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class MembershipOffersRepository implements RepositoryBase<MembershipOffer>{
	private HashMap<String,MembershipOffer> offersList;
	private String path = "data";
	public MembershipOffersRepository() {
		offersList = new HashMap<String,MembershipOffer>();
	}
	public MembershipOffersRepository(String path) {
		this.path=path;
	}
	@Override
	public Collection<MembershipOffer> getAll() {
		readData();
		return this.offersList.values();
	}
	public Set<String> getAllKeys() {
		return this.offersList.keySet();
	}
	@Override
	public MembershipOffer getById(String id) {
		readData();
		return this.offersList.get(id);
	}

	@Override
	public void create(String id, MembershipOffer item) {
		this.offersList.put(id, item);
		writeData();
		readData();
		
	}

	@Override
	public void delete(String id) {
		this.offersList.remove(id);
		writeData();
		readData();
	}

	@Override
	public void update(String id, MembershipOffer item) {
		this.offersList.put(id,item);
		writeData();
		readData();
	}
	private void readData() {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		BufferedReader in = null;
		try {
			File file = new File(this.path + "/membershipOffers.json");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			StringBuilder data = new StringBuilder();
			String line;
			while((line = in.readLine())!=null) {
				data.append(line);
			}
			HashMap<String,MembershipOffer> fromJson = gson.fromJson(data.toString(), new TypeToken<HashMap<String, MembershipOffer>>(){}.getType());
			this.offersList = fromJson;

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
			File file = new File(this.path + "/membershipOffers.json");
			out = new BufferedWriter(new FileWriter(file));
			out.write(gson.toJson(this.offersList));
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
