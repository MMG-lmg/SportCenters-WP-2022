package controller;

import java.time.LocalDate;
import static spark.Spark.post;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.ManagerDTO;
import beans.Manager;
import service.ManagerService;
import service.SportsCenterService;
import util.LocalDateAdapterDeserializer;

public class ManagerController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).create();
	private static ManagerService service = new ManagerService();
	private static SportsCenterService centersService = new SportsCenterService();
	
	public static void addManager() {
		post("rest/addManager", (req,res) -> {
			res.type("application/json");			
			ManagerDTO dto = gson.fromJson(req.body(), ManagerDTO.class);
			Manager manager = dto.convertDTO(centersService.getAll());
			service.create(manager);
			//TODO implement some validations in service and add casting exceptions
			//catch them here, return FAILIURE.
			return "SUCCESS";
		});
	}
}
