package main;

import static spark.Spark.*;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.Timer;

import beans.Address;
import beans.CenterStatus;
import beans.CenterTypes;
import beans.Coach;
import beans.Customer;
import beans.CustomerType;
import beans.CustomerTypeNames;
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
import controller.TrainingHistoryController;
import controller.UserController;
import repository.CustomerRepository;
import repository.UserRepository;
import service.CoachService;
import service.CustomerTypeService;
import service.ManagerService;
import service.SportsCenterService;
import service.TrainingService;
import service.UserService;
import spark.Spark;
import util.MembershipChecker;

public class Main {
    public static void main(String[] args) throws IOException {
    	port(8080);
    	
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
    	TrainingController.editTraining();
    	TrainingController.getTraining();
    	TrainingController.getTrainingsForCenter();
    	
    	MembershipOffersController.addOffer();
    	MembershipOffersController.getOffer();
    	MembershipOffersController.getAllOffers();
    	
    	MembershipController.addMembership();
    	MembershipController.getActiveMembershipForUsername();
    	
    	TrainingHistoryController.addTrainingHistory();
    	TrainingHistoryController.getTrainingHistoryByCustomerUsername();
    	TrainingHistoryController.getTrainingHistoryByCustomerDateLimited();
    	TrainingHistoryController.getTrainingHistoryByCoachUsername();
    	TrainingHistoryController.getTrainingHistoryByCenterId();
    	TrainingHistoryController.cancelTraining();
    	
    	CustomerTypeService service = new CustomerTypeService();
    	
    	/*service.create(new CustomerType("",CustomerTypeNames.BRONZE,3,1500));
    	service.create(new CustomerType("",CustomerTypeNames.SILVER,5,2500));
    	service.create(new CustomerType("",CustomerTypeNames.GOLD,10,3500));*/
    	
    	Timer membershipTimer = new Timer();
    	ZoneId defaultZoneId = ZoneId.systemDefault();
    	new MembershipChecker().run();//run on startup and at midnight every night (if its running)
    	membershipTimer.schedule(new MembershipChecker(), Date.from(LocalDate.now().atStartOfDay(defaultZoneId).toInstant()), 86400000); //86400000ms = 24h
    }
}
