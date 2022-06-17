package controller;
import static spark.Spark.post;

import java.util.Collection;

import beans.User;
import service.UserService;

public class UserController {
	private static UserService service = new UserService();
	
	public static void login() {
		post("rest/login", (req,res) ->{
			res.type("application/json");
			Collection<User> data = service.getAll();
			System.out.println(req);
			System.out.println(req.params("username"));
			System.out.println(req.params("password"));
			for(User user : data) {
				if(user.getPassword().equals(req.params("password")) && user.getUserName().equals(req.params("username"))){
					
					return "SUCCESS,"+ user.getRole().toString();
				}
			}
			return "FAILIURE";
		});
	}
}
