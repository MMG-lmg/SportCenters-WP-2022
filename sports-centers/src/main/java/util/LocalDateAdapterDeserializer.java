package util;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

public class LocalDateAdapterDeserializer implements JsonDeserializer<LocalDate>{
	public LocalDate deserialize(JsonElement json, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
	    String[] date = json.getAsJsonPrimitive().getAsString().split("-");
		return LocalDate.of(Integer.parseInt(date[0]), Integer.parseInt(date[1]), Integer.parseInt(date[2]));
	}
}
