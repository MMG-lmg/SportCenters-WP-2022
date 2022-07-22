package controller;

import static spark.Spark.post;
import static spark.Spark.get;
import java.time.LocalDate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Coach;
import beans.Manager;
import service.CoachService;
import service.ManagerService;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class CoachController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static CoachService service = new CoachService();
	
	public static void addCoach() {
		post("rest/addCoach", (req,res) -> {
			res.type("application/json");
			Coach coach = gson.fromJson(req.body(), Coach.class);
			service.create(coach);
			//TODO implement some validations in service and add casting exceptions
			//catch them here, return FAILIURE.
			return "SUCCESS";
		});
	}
	public static void getCoach() {
		get("rest/getCoach", (req,res)->{
			res.type("application/json");
			Coach coach = service.getById(req.queryParams("username"));
			if(coach!=null) {
				return gson.toJson(coach);
			}
			return null;
		});
	}
}
