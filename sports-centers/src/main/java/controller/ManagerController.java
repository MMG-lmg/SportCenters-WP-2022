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
import beans.User;
import beans.UserRole;
import service.ManagerService;
import service.SportsCenterService;
import spark.Session;
import util.DuplicateUsernameCheck;
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
			if(DuplicateUsernameCheck.isDuplicate(dto.getUserName())) {
				return "FAILIURE_USERNAME";
			}
			Manager manager = dto.convertDTO(centersService.getAll());
			service.create(manager);
			return "SUCCESS";
		});
	}
	public static void getAll() {
		get("rest/getManagers", (req,res) ->{
			res.type("application/json");
			return gson.toJson(service.getAll());
		});
	}
	public static void getManager() {
		get("rest/getManager", (req,res) ->{
			res.type("application/json");
			Manager manager = service.getById(req.queryParams("username"));
			if(manager!=null) {
				return gson.toJson(manager);
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
			if(retVal.isEmpty()) {
				return "";
			}
			return gson.toJson(retVal);
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
				User userFromSession = session.attribute("user");
				if(userFromSession.getRole().equals(UserRole.MENAGER)) {
					session.attribute("user", manager);
				} //when called by admin from addCenter do not overwrite session data
				return "SUCCESS";
			}
		});
	}
}
