package main;

import static spark.Spark.*;

import spark.Spark;

public class Main {
    public static void main(String[] args) {
    	port(8080);
        get("/hello", (req, res) -> "test12,12");
    	
    	
    }
}
