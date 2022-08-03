package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.TrainingDTO;
import beans.Training;

import static spark.Spark.post;

import service.CoachService;
import service.SportsCenterService;
import service.TrainingService;
import util.ImageBase64Converter;

public class TrainingController {
	private static Gson gson = new GsonBuilder().create();
	private static TrainingService service = new TrainingService();
	private static SportsCenterService centerService = new SportsCenterService();
	private static CoachService coachService = new CoachService();
	private static String path = "data\\img\\";
	
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
}
