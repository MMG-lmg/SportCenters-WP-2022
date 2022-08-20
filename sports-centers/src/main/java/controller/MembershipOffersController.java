package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.time.LocalDate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Membership;
import beans.MembershipOffer;
import service.MembershipOffersService;
import service.MembershipService;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class MembershipOffersController {
	private static Gson gson = new GsonBuilder().create();
	private static MembershipOffersService service = new MembershipOffersService();
	
	public static void getOffer() {
		get("rest/Membership/get", (req,res) ->{
			res.type("application/json");
			MembershipOffer offer = service.getById(req.queryParams("id"));
			if(offer!=null) {
				return gson.toJson(offer);
			}
			return "FAILIURE";
		});
	}
	public static void addOffer() {
		post("rest/Membership/post", (req,res) ->{
			res.type("application/json");
			MembershipOffer offer = gson.fromJson(req.body(), MembershipOffer.class);
			service.create(offer);
			return "SUCCESS";
		});
	}
}
