package controller;
import static spark.Spark.post;
import static spark.Spark.get;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.ManagerDTO;
import beans.Manager;
import beans.User;
import beans.UserRole;
import service.UserService;
import spark.Session;
import util.Credentials;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;

public class UserController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static UserService service = new UserService();
	
	public static void login() {
		post("rest/login", (req,res) ->{
			res.type("application/json");
			Collection<User> data = service.getAll();
			Credentials cred = gson.fromJson(req.body(), Credentials.class);
			for(User user : data) {
				if(user.getPassword().equals(cred.getPassword()) && user.getUserName().equals(cred.getUsername())){
					
					Session session = req.session(true);
					User loginUser = session.attribute("user");
					if(loginUser == null) {
						session.attribute("user", user);
					}
					
					return "SUCCESS";
				}
			}
			return "FAILIURE";
		});
	}
	public static void logout() {
		get("rest/logout", (req, res) -> {
			Session session = req.session(true);
			if (session.attribute("user") != null) {
				session.invalidate();
				System.out.println("Done");
			}
			return "";
		});
	}
	public static void isLoggedIn() {
		get("rest/loginCheck", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User user = session.attribute("user");
			return gson.toJson(user);
		});
	}
	public static void getAllAdmins() {
		get("rest/getAdmins", (req,res) ->{
			res.type("application/json");
			Collection<User> adminList = new ArrayList<User>();
			for(User user : service.getAll()) {
				if(user.getRole().equals(UserRole.ADMIN)) {
					adminList.add(user);
				}
			}
			return gson.toJson(adminList);
		});
	}
	public static void getAdmin() {
		get("rest/getAdmin", (req,res) ->{
			res.type("application/json");
			User admin = service.getById(req.queryParams("username"));
			if(admin!=null) {
				return gson.toJson(admin);
			}
			return "FAILIURE";
		});
	}
	public static void editAdmin() {
		post("rest/editAdmin", (req,res)->{
			res.type("application/json");
			User admin = gson.fromJson(req.body(), User.class);
			User storedAdmin = service.getById(admin.getUserName());
			if(storedAdmin==null) {
				return "FAILIURE";
			}
			else {
				admin.setPassword(storedAdmin.getPassword());
				service.update(admin.getUserName(), admin);
				Session session = req.session(true);
				session.attribute("user", admin);
				return "SUCCESS";
			}
		});
	}
	public static void editPassword() {
		post("rest/editPassword",(req,res)->{
			res.type("application/json");
			Credentials cred = gson.fromJson(req.body(), Credentials.class);
			User user = service.getById(cred.getUsername());
			if(user!=null) {
				user.setPassword(cred.getPassword());
				service.update(user.getUserName(), user);
				return "SUCCESS";
			}
			else {
				return "FAILIURE";
			}
			});
	}
}
