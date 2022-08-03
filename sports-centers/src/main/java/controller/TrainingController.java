package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.TrainingDTO;
import beans.Training;
import beans.User;

import static spark.Spark.get;
import static spark.Spark.post;

import java.time.LocalDate;
import java.util.Collection;

import service.CoachService;
import service.SportsCenterService;
import service.TrainingService;
import util.ImageBase64Converter;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class TrainingController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static TrainingService service = new TrainingService();
	private static SportsCenterService centerService = new SportsCenterService();
	private static CoachService coachService = new CoachService();
	private static String path = "data\\img\\";
	
	@SuppressWarnings("unused")
	public static void addTraining() {
		post("rest/addTraining", (req,res)->{
			res.type("application/json");
			TrainingDTO dto = gson.fromJson(req.body(), TrainingDTO.class);
			Training training = dto.convertDTO(centerService.getAll(), coachService.getAll());
			training.setImagePath(ImageBase64Converter.decode(training.getImagePath(), path, training.getTitle()));
			if(training != null) {
				service.create(training);
				return "SUCCESS";
			}
			else {
				return "FAILIURE";
			}
		});
	}
	public static void getTrainingsForCenter() {
		get("rest/getTrainingsForCenter", (req,res) ->{
			res.type("application/json");
			String centerId = req.queryParams("centerId");
			Collection<Training> trainings =  service.getForCenterId(centerId);
			if(!trainings.isEmpty()) {
				return gson.toJson(trainings);
			}
			return "FAILIURE";
		});
	}
}