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
import beans.Training;
import beans.User;
import beans.UserRole;
import controller.CoachController;
import controller.CustomerContoller;
import controller.ManagerController;
import controller.MembershipController;
import controller.MembershipOffersController;
import controller.SportsCenterController;
import controller.TrainingController;
import controller.UserController;
import repository.CustomerRepository;
import repository.UserRepository;
import service.CoachService;
import service.ManagerService;
import service.SportsCenterService;
import service.TrainingService;
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
    	ManagerController.getFreeManagers();
    	
    	SportsCenterController.getAllCenters();
    	SportsCenterController.getAllCentersWithoutManager();
    	SportsCenterController.getCenter();
    	SportsCenterController.addCenter();
    	
    	TrainingController.addTraining();
    	TrainingController.getTrainingsForCenter();
    	
    	MembershipOffersController.addOffer();
    	MembershipOffersController.getOffer();
    	MembershipOffersController.getAllOffers();
    	
    	MembershipController.addMembership();
    	MembershipController.getActiveMembershipForUsername();
    	/*TrainingService service = new TrainingService();
    	SportsCenterService centerService = new SportsCenterService();
    	SportsCenter center = centerService.getById("PhdugsAF");
    	CoachService coachService = new CoachService();
    	Coach coach = coachService.getById("mirkoTrener");
    	service.create(new Training("","Draganovi tegovi",center,120,coach,"Dizite kod Dragana",""));
    	*/
    }
}
