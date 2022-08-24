package util;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class LocalDateTimeAdapterDeserialiser implements JsonDeserializer<LocalDateTime>{

	@Override
	public LocalDateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
			throws JsonParseException {
		//2022-08-26T13:47
		String[] date = json.getAsJsonPrimitive().getAsString().split("T")[0].split("-");
		String[] time = json.getAsJsonPrimitive().getAsString().split("T")[1].split(":");
		return LocalDateTime.of(Integer.parseInt(date[0]),Integer.parseInt(date[1]),Integer.parseInt(date[2]), Integer.parseInt(time[0]), Integer.parseInt(time[1]));
	}



}
