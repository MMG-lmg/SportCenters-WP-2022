package util;

import java.util.Random;

public class IdGenerator {
	public static String generate()
    {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        char[] stringChars = new char[8];
        Random random = new Random();

        for (int i = 0; i < stringChars.length; i++)
        {
            stringChars[i] = chars.charAt(random.nextInt(chars.length()));
        }

        String finalString = new String(stringChars);
        return finalString;
    }
}
