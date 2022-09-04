package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.TrainingDTO;
import beans.Training;
import beans.User;

import static spark.Spark.get;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

import service.CoachService;
import service.SportsCenterService;
import service.TrainingService;
import util.ImageBase64Converter;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;
import util.LocalDateTimeAdapterDeserialiser;
import util.LocalDateTimeAdapterSerialiser;

public class TrainingController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterDeserialiser()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapterSerialiser()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static TrainingService service = new TrainingService();
	private static SportsCenterService centerService = new SportsCenterService();
	private static CoachService coachService = new CoachService();
	private static String path = "data\\img\\";
	
	@SuppressWarnings("unused")
	public static void addTraining() {
		post("rest/addTraining", (req,res)->{
			res.type("application/json");
			TrainingDTO dto = gson.fromJson(req.body(), TrainingDTO.class);
			for(Training training : service.getAll()) {
				if(training.getTitle().equals(dto.getTitle())) {
					return "FAILIURE_NAME";
				}
			}
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
	public static void editTraining() {
		post("rest/editTraining", (req,res)->{
			res.type("application/json");
			Training training = gson.fromJson(req.body(), Training.class);
			training.setImagePath(service.getById(training.getTrainingId()).getImagePath());
			service.update(training.getTrainingId(), training);
			return "SUCCESS";
		});
	}
	public static void getTraining() {
		get("rest/getTraining",(req,res)->{
			res.type("application/json");
			Training training = service.getById(req.queryParams("trainingId"));
			if(training!=null) {
				return gson.toJson(training);
			}
			return "FAILIURE";
		});
	}
	public static void getTrainingsForCenter() {
		get("rest/getTrainingsForCenter", (req,res) ->{
			res.type("application/json");
			String centerId = req.queryParams("centerId");
			Collection<Training> trainings =  service.getForCenterId(centerId);
			if(!trainings.isEmpty()) {
				for(Training training : trainings) {
					training.setImagePath(ImageBase64Converter.convert(training.getImagePath()));
				}
				return gson.toJson(trainings);
			}
			return "FAILIURE";
		});
	}
}
