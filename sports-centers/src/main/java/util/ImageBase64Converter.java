package util;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Base64;

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
}
