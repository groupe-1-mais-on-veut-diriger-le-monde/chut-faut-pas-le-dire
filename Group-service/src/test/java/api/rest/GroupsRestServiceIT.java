package api.rest;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.containsString;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import domain.model.Group;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;


public class GroupsRestServiceIT {

	@BeforeAll
	public static void setup() {
		RestAssured.baseURI = "http://localhost:28080/Groups";
		RestAssured.port = 8080;
	}
	@Test
 	public void testGetAll() {
 		when().get("/").then().body(containsString("group1"));
 	}

 	@Test
 	public void testGetById() {
 		when().get("/id/2").then().body(containsString("group2"));
 	}

 	@Test
 	public void testGetByName() {
 		when().get("/name/group1").then().body(containsString("group1"));
 	}

 	
	
	@Test
	public void testDelete() {
		with().contentType(ContentType.JSON).when().request("DELETE", "/delete/3").then().statusCode(200);
	}
	
}
