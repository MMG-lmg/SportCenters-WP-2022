package controller;

import static spark.Spark.post;
import static spark.Spark.get;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.TrainingHistoryDTO;
import beans.TrainingHistory;
import service.CoachService;
import service.CustomerService;
import service.TrainingHistoryService;
import service.TrainingService;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;
import util.LocalDateTimeAdapterDeserialiser;
import util.LocalDateTimeAdapterSerialiser;

public class TrainingHistoryController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterDeserialiser()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterSerialiser()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static TrainingHistoryService service = new TrainingHistoryService();
	private static CoachService coachService = new CoachService();
	private static TrainingService trainingService = new TrainingService();
	private static CustomerService customerService = new CustomerService();
	
	public static void addTrainingHistory() {
		post("rest/addTrainingHistory", (req,res)->{
			res.type("application/json");
			TrainingHistoryDTO dto = gson.fromJson(req.body(), TrainingHistoryDTO.class);
			TrainingHistory history  = dto.convertDTO(trainingService.getAll(), coachService.getAll(), customerService.getAll());
			if(history!=null) {
				service.create(history);
				return "SUCCESS";
			}
			else {
				return "FAILIURE";
			}
		});
	}
	public static void getTrainingHistoryByCustomerUsername() {
		get("rest/getHistoryCustomer",(req,res)->{
			res.type("application/json");
			return gson.toJson(service.getForCustomer(req.queryParams("username")));
		});
	}
	
	public static void getTrainingHistoryByCoachUsername() {
		get("rest/getHistoryCoach",(req,res)->{
			res.type("application/json");
			return gson.toJson(service.getForCoach(req.queryParams("username")));
		});
	}
	public static void cancelTraining() {
		post("rest/cancelTraining", (req,res)->{
			res.type("application/json");
			service.delete(req.body());
			return "SUCCESS";
		});
	}
}
