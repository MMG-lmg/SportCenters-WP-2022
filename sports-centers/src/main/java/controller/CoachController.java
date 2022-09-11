package controller;

import static spark.Spark.post;
import static spark.Spark.get;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Coach;
import beans.Customer;
import beans.Manager;
import service.CoachService;
import service.ManagerService;
import spark.Session;
import util.DuplicateUsernameCheck;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;
import util.LocalDateTimeAdapterDeserialiser;
import util.LocalDateTimeAdapterSerialiser;

public class CoachController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterDeserialiser()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterSerialiser()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static CoachService service = new CoachService();
	
	public static void addCoach() {
		post("rest/addCoach", (req,res) -> {
			res.type("application/json");
			Coach coach = gson.fromJson(req.body(), Coach.class);
			if(DuplicateUsernameCheck.isDuplicate(coach.getUserName())) {
				return "FAILIURE_USERNAME";
			}
			service.create(coach);
			return "SUCCESS";
		});
	}
	public static void getAll() {
		get("rest/getCoaches",(req,res)->{
			res.type("application/json");
			return gson.toJson(service.getAll());
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
	public static void editCoach() {
		post("rest/editCoach", (req,res)->{
			res.type("application/json");
			Coach coach = gson.fromJson(req.body(), Coach.class);
			Coach storedCoach = service.getById(coach.getUserName());
			
			if(storedCoach == null) {
				return "FAILIURE";
			}
			else {
				coach.setPassword(storedCoach.getPassword());
				service.update(coach.getUserName(), coach);
				Session session = req.session(true);
				session.attribute("user", coach);
				return "SUCCESS";
			}
		});
	}
}
