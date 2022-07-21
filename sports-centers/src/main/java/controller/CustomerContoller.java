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
import util.LocalDateAdapterDeserializer;


public class CustomerContoller {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapterDeserializer()).create();
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
		get("rest/getManager", (req,res) ->{
			res.type("application/json");
			Customer customer = service.getById(req.queryParams("username"));
			if(customer!=null) {
				return customer;
			}
			return "FAILIURE";
		});
							
	}
}
