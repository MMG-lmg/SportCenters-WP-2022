package main;

import static spark.Spark.*;

import beans.Address;
import beans.CenterStatus;
import beans.CenterTypes;
import beans.Location;
import beans.SportsCenter;
import service.SportsCenterService;
import spark.Spark;

public class Main {
    public static void main(String[] args) {
    	//port(8080);
        //get("/hello", (req, res) -> "test12,12");
    	SportsCenterService service = new SportsCenterService();
    	service.create(new SportsCenter("-1","Draganova teretana",CenterTypes.GYM,CenterStatus.CLOSED,new Location(69.420,420.69,new Address("draganova","6B","NewNow","21000")),"",0.0,new int[] {8,20}));
    }
}
