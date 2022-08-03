package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Training;

import static spark.Spark.post;

import service.TrainingService;

public class TrainingController {
	private static Gson gson = new GsonBuilder().create();
	private static TrainingService service = new TrainingService();
	
	public static void addCoach() {
		post("rest/addTraining", (req,res)->{
			res.type("application/json");
			Training training = gson.fromJson(req.body(), Training.class);
			service.create(training);
			return "SUCCESS";
		});
	}
}
