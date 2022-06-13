package main;

import static spark.Spark.*;

import java.io.File;
import java.io.IOException;

import beans.Address;
import beans.CenterStatus;
import beans.CenterTypes;
import beans.Location;
import beans.SportsCenter;
import controller.SportsCenterController;
import service.SportsCenterService;
import spark.Spark;

public class Main {
    public static void main(String[] args) throws IOException {
    	port(8080);
        //get("/hello", (req, res) -> "test12,12");
    	/*SportsCenterService service = new SportsCenterService();
    	service.create(new SportsCenter("-1","Draganova teretana",CenterTypes.GYM,CenterStatus.CLOSED,new Location(69.420,420.69,new Address("draganova","6B","NewNow","21000")),"",0.0,new int[] {8,20}));
    	service.create(new SportsCenter("-1","CoolPool",CenterTypes.POOL,CenterStatus.CLOSED,new Location(94.54,65.1,new Address("Cirpanova","6","Cenej","21000?")),"",0.0,new int[] {7,23}));
    	service.create(new SportsCenter("-1","Just Dance",CenterTypes.DANCE_STUDIO,CenterStatus.OPEN,new Location(93.54,62.1,new Address("Wall street","6","Backo Dobro polje","797979")),"",0.0,new int[] {0,24}));*/
    	staticFiles.externalLocation(new File("./static").getCanonicalPath());
    	
    	SportsCenterController.getAllCenters();
    }
}
