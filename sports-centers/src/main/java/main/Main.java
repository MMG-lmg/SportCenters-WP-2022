package main;

import static spark.Spark.*;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

import beans.Address;
import beans.CenterStatus;
import beans.CenterTypes;
import beans.Coach;
import beans.Customer;
import beans.CustomerType;
import beans.Gender;
import beans.Location;
import beans.Manager;
import beans.SportsCenter;
import beans.User;
import beans.UserRole;
import controller.CoachController;
import controller.CustomerContoller;
import controller.ManagerController;
import controller.SportsCenterController;
import controller.UserController;
import repository.CustomerRepository;
import repository.UserRepository;
import service.CoachService;
import service.ManagerService;
import service.SportsCenterService;
import service.UserService;
import spark.Spark;

public class Main {
    public static void main(String[] args) throws IOException {
    	port(8080);
        //get("/hello", (req, res) -> "test12,12");
    	
    	staticFiles.externalLocation(new File("./static").getCanonicalPath());
    	
    	UserController.login();
    	UserController.logout();
    	UserController.isLoggedIn();
    	UserController.getAdmin();
    	UserController.editAdmin();
    	UserController.getAllAdmins();
    	
    	CustomerContoller.addCustomer();
    	CustomerContoller.getCustomer();
    	CustomerContoller.editCustomer();
    	CustomerContoller.getAll();
    	
    	CoachController.addCoach();
    	CoachController.getCoach();
    	CoachController.editCoach();
    	CoachController.getAll();
    	
    	ManagerController.addManager();
    	ManagerController.getManager();
    	ManagerController.editManager();
    	ManagerController.getAll();
    	
    	SportsCenterController.getAllCenters();
    	SportsCenterController.getAllCentersWithoutManager();
    	SportsCenterController.getCenter();
    	SportsCenterController.addCenter();
    	
    }
}
