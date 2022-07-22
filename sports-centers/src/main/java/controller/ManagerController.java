package controller;

import java.time.LocalDate;
import static spark.Spark.post;
import static spark.Spark.get;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.ManagerDTO;
import beans.Manager;
import service.ManagerService;
import service.SportsCenterService;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class ManagerController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
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
	public static void getManager() {
		get("rest/getManager", (req,res) ->{
			res.type("application/json");
			Manager manager = service.getById(req.queryParams("username"));
			if(manager!=null) {
				ManagerDTO dto = ManagerDTO.convertObject(manager);
				return gson.toJson(dto);
			}
			return "FAILIURE";
		});
							
	}
}
