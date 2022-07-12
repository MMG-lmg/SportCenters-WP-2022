package controller;

import java.time.LocalDate;
import static spark.Spark.post;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Manager;
import service.ManagerService;
import util.LocalDateAdapterDeserializer;

public class ManagerController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).create();
	private static ManagerService service = new ManagerService();
	
	public static void addManager() {
		post("rest/addManager", (req,res) -> {
			res.type("application/json");
			Manager manager = gson.fromJson(req.body(), Manager.class);
			service.create(manager);
			//TODO implement some validations in service and add casting exceptions
			//catch them here, return FAILIURE.
			return "SUCCESS";
		});
	}
}
