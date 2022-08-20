package controller;

import java.time.LocalDate;

import static spark.Spark.get;
import static spark.Spark.post;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

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
	public static void addMembership() {
		post("rest/Membership/post", (req,res) ->{
			res.type("application/json");
			Membership membership = gson.fromJson(req.body(), Membership.class);
			membership.setCustomer(customerService.getById(membership.getCustomer().getUserName()));
			service.create(membership);
			return "SUCCESS";
		});
	}
	
}