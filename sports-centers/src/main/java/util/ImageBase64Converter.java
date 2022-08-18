package util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;

public class ImageBase64Converter {
	public static String convert(String imagePath) {
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
	public static String decode(String image, String path, String imageTitle) {
		byte[] data = new byte[8192];
		data = Base64.getDecoder().decode(image);
		
		ByteArrayInputStream inputStream = new ByteArrayInputStream(data);
	    BufferedImage bImage;
		try {
			bImage = ImageIO.read(inputStream);
			File f = new File(path + imageTitle +".jpg");
			ImageIO.write(bImage, "jpg", f);
			//handle write->fail
			return f.getPath();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   return null;
	}
}
