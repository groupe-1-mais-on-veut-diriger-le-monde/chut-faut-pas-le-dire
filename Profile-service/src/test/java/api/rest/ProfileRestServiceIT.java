package api.rest;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.containsString;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import domain.model.Profile;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;


 class ProfileRestServiceIT {

	@BeforeAll
	public static void setup() {
		RestAssured.baseURI = "http://localhost:28080/Profile";
		RestAssured.port = 8080;
	}
	@Test
 	 void testGetAll() {
 		when().get("/").then().body(containsString("jan"));
 	}

 	@Test
 	 void testGetById() {
 		when().get("/id/1").then().body(containsString("jan"));
 	}

 	@Test
 	 void testGetByName() {
 		when().get("/name/jan").then().body(containsString("jan"));
 	}

 	
	
	@Test
	 void testDelete() {
		with().contentType(ContentType.JSON).when().request("DELETE", "/delete/2").then().statusCode(200);
	}
	
}
