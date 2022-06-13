package controller;

import com.google.gson.Gson;

import beans.SportsCenter;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.put;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Base64;
import java.util.Collection;

import static spark.Spark.post;

import service.SportsCenterService;

public class SportsCenterController{
	private static Gson gson = new Gson();
	private static SportsCenterService service = new SportsCenterService();
	
	public static void getAllCenters() {
		get("rest/centers/", (req,res) ->{
			res.type("application/json");
			Collection<SportsCenter> dataWithImgPaths = service.getAll();
			for(SportsCenter center : dataWithImgPaths) {
				center.setLogoPath(imageConverter(center.getLogoPath()));
			}
			return gson.toJson(dataWithImgPaths);
		});
	}
	public static void addCenter() {
		post("rest/centers/add",(req,res)->{
			res.type("application/json");
			SportsCenter center = gson.fromJson(req.body(), SportsCenter.class);
			service.create(center);
			return "SUCCESS";
		});
	}
	
	private static String imageConverter(String imagePath) {
		byte[] data = null;
		String retVal = "";
		try {
			FileInputStream stream = new FileInputStream(imagePath);
			
			int bufLength = 2048;
		    byte[] buffer = new byte[2048];
		    
		    
		    ByteArrayOutputStream out = new ByteArrayOutputStream();
		    int readLength;
		    while ((readLength = stream.read(buffer, 0, bufLength)) != -1) {
		        out.write(buffer, 0, readLength);
		    }
		    data = out.toByteArray();
		    stream.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(data !=null) {
			retVal = Base64.getEncoder().withoutPadding().encodeToString(data);
		}
		
		return retVal;
		
	}
}
