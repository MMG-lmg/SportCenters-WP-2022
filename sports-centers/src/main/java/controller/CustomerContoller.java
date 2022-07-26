package controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.time.LocalDate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import DTO.ManagerDTO;
import beans.Customer;
import beans.Manager;
import service.CustomerService;
import spark.Session;
import util.LocalDateAdapterDeserializer;
import util.LocalDateAdapterSerializer;


public class CustomerContoller {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).registerTypeAdapter(LocalDate.class, new LocalDateAdapterSerializer()).create();
	private static CustomerService service = new CustomerService();
	
	public static void addCustomer() {
		post("rest/addCustomer", (req,res) ->{
			res.type("application/json");
			Customer customer = gson.fromJson(req.body(), Customer.class);
			service.create(customer);
			//TODO implement some validations in service and add casting exceptions
			//catch them here, return FAILIURE.
			return "SUCCESS";
		});
	}
	public static void getCustomer() {
		get("rest/getCustomer", (req,res) ->{
			res.type("application/json");
			Customer customer = service.getById(req.queryParams("username"));
			if(customer!=null) {
				return gson.toJson(customer);
			}
			return "FAILIURE";
		});
							
	}
	public static void editCustomer() {
		post("rest/editCustomer", (req,res)->{
			res.type("application/json");
			Customer customer = gson.fromJson(req.body(), Customer.class);
			Customer storedCustomer = service.getById(customer.getUserName());
			if(storedCustomer==null) {
				return "FAILIURE";
			}
			else {
				customer.setPassword(storedCustomer.getPassword());
				service.update(customer.getUserName(), customer);
				Session session = req.session(true);
				session.attribute("user", customer);
				return "SUCCESS";
			}
		});
	}
}
