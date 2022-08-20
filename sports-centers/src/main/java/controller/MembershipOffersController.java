package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.time.LocalDate;
import java.util.Collection;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Membership;
import beans.MembershipOffer;
import service.MembershipOffersService;

public class MembershipOffersController {
	private static Gson gson = new GsonBuilder().create();
	private static MembershipOffersService service = new MembershipOffersService();
	
	public static void getAllOffers() {
		get("rest/Membership/Offers/getAll", (req,res) ->{
			res.type("application/json");
			Collection<MembershipOffer> offers = service.getAll();
			if(offers!=null) {
				return gson.toJson(offers);
			}
			return "FAILIURE";
		});
	}
	public static void getOffer() {
		get("rest/Membership/Offers/get", (req,res) ->{
			res.type("application/json");
			MembershipOffer offer = service.getById(req.queryParams("id"));
			if(offer!=null) {
				return gson.toJson(offer);
			}
			return "FAILIURE";
		});
	}
	public static void addOffer() {
		post("rest/Membership/Offers/add", (req,res) ->{
			res.type("application/json");
			MembershipOffer offer = gson.fromJson(req.body(), MembershipOffer.class);
			service.create(offer);
			return "SUCCESS";
		});
	}
}
