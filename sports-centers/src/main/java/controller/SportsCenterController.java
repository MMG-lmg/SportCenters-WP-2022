package controller;

import com.google.gson.Gson;

import beans.SportsCenter;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.put;
import static spark.Spark.post;

import service.SportsCenterService;

public class SportsCenterController{
	private static Gson gson = new Gson();
	private static SportsCenterService service = new SportsCenterService();
	
	public static void getAllCenters() {
		get("rest/centers/", (req,res) ->{
			res.type("application/json");
			return gson.toJson(service.getAll());
		});
	}
	public static void addCenter() {
		post("rest/centers/add",(req,res)->{
			res.type("application/json");
			SportsCenter center = gson.fromJson(req.body(), SportsCenter.class);
			service.create(center);
			return "SUCCESS";
		});
	}
}
