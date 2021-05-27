package api.rest;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.containsString;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import domain.model.Group;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;


 class GroupsRestServiceIT {

	@BeforeAll
	public static void setup() {
		RestAssured.baseURI = "http://localhost:28080/Groups";
		RestAssured.port = 8080;
	}
	@Test
 	 void testGetAll() {
 		when().get("/").then().body(containsString("group1"));
 	}

 	@Test
 	 void testGetById() {
 		when().get("/id/2").then().body(containsString("group2"));
 	}

 	@Test
 	 void testGetByName() {
 		when().get("/name/group1").then().body(containsString("group1"));
 	}

 	
	
	@Test
	 void testDelete() {
		with().contentType(ContentType.JSON).when().request("DELETE", "/delete/3").then().statusCode(200);
	}
	
	@Test
	public void testCreate() {
		Group Group = new Group("nom4", 50, 1, 2, 3, 4,5,"result");
		with().contentType(ContentType.JSON).body(Group).when().request("POST", "/").then().statusCode(200);
	}
	
}
