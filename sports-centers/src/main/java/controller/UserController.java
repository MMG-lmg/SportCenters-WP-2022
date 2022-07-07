package controller;
import static spark.Spark.post;
import static spark.Spark.get;

import java.time.LocalDate;
import java.util.Collection;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import service.UserService;
import spark.Session;
import util.Credentials;
import util.LocalDateAdapterSerializer;

public class UserController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
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
}
