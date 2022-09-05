package controller;

import java.time.LocalDate;
import java.util.Collection;

import static spark.Spark.get;
import static spark.Spark.post;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.MembershipDTO;
import beans.Membership;
import service.CustomerService;
import service.MembershipService;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class MembershipController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static MembershipService service = new MembershipService();
	private static CustomerService customerService = new CustomerService();

	public static void getMembership() {
		get("rest/Membership/get", (req,res) ->{
			res.type("application/json");
			Membership membership = service.getById(req.queryParams("id"));
			if(membership!=null) {
				return gson.toJson(membership);
			}
			return "FAILIURE";
		});
	}
	public static void getActiveMemberships() {
		get("rest/Membership/getAllActive",(req,res) ->{
			Collection<Membership> activeMemberships = service.getActive();
			if(activeMemberships!=null) {
				return gson.toJson(activeMemberships);
			}
			return "FAILIURE";
		});
	}
	
	public static void getActiveMembershipForUsername() {
		get("rest/Membership/getActive",(req,res) ->{
			res.type("application/json");
			Membership membership = service.getActiveByUsername(req.queryParams("username"));
			if(membership!=null) {
				return gson.toJson(membership);
			}
			return "FAILIURE";
		});
		
	}
	public static void addMembership() {
		post("rest/Membership/add", (req,res) ->{
			res.type("application/json");
			MembershipDTO dto = gson.fromJson(req.body(), MembershipDTO.class);
			Membership membership = dto.convertDTO(customerService.getAll());
			service.create(membership);
			return "SUCCESS";
		});
	}
	
}
