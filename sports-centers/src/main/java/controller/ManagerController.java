package controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

import static spark.Spark.post;
import static spark.Spark.get;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.ManagerDTO;
import beans.Coach;
import beans.Manager;
import service.ManagerService;
import service.SportsCenterService;
import spark.Session;
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
	public static void getAll() {
		get("rest/getManagers", (req,res) ->{
			res.type("application/json");
			Collection<ManagerDTO> DtoList = new ArrayList<ManagerDTO>();
			for(Manager manager : service.getAll()) {
				DtoList.add(ManagerDTO.convertObject(manager));
			}
			return gson.toJson(DtoList);
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
	public static void getFreeManagers() {
		get("rest/getFreeManagers", (req,res) ->{
			res.type("application/json");
			Collection<Manager> retVal = new ArrayList<Manager>();
			for(Manager manager : service.getAll()) {
				if(manager.getCenter()==null) {
					retVal.add(manager);
				}
			}
			return retVal;
		});
	}
	public static void editManager() {
		post("rest/editManager", (req,res)->{
			res.type("application/json");
			ManagerDTO managerDTO = gson.fromJson(req.body(), ManagerDTO.class);
			Manager manager = managerDTO.convertDTO(centersService.getAll());
			Manager storedManager = service.getById(manager.getUserName());
			
			if(storedManager == null) {
				return "FAILIURE";
			}
			else {
				manager.setPassword(storedManager.getPassword());
				service.update(manager.getUserName(), manager);
				Session session = req.session(true);
				session.attribute("user", manager);
				return "SUCCESS";
			}
		});
	}
}
