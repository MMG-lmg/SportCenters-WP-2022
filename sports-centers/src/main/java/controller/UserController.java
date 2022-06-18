package controller;
import static spark.Spark.post;

import java.util.Collection;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import service.UserService;
import util.Credentials;

public class UserController {
	private static Gson gson = new GsonBuilder().create();
	private static UserService service = new UserService();
	
	public static void login() {
		post("rest/login", (req,res) ->{
			res.type("application/json");
			Collection<User> data = service.getAll();
			Credentials cred = gson.fromJson(req.body(), Credentials.class);
			for(User user : data) {
				if(user.getPassword().equals(cred.getPassword()) && user.getUserName().equals(cred.getUsername())){
					
					return "SUCCESS,"+ user.getRole().toString();
				}
			}
			return "FAILIURE";
		});
	}
}
