package api.rest;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import domain.model.Profile;
import domain.service.ProfileService;


@ApplicationScoped
@Path("/Profile")
public class ProfileRestService {
	
	@Inject
	private ProfileService ProfileService;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Profile> getAll() {
		return ProfileService.getAll();
	}
	
	@GET
	@Path("/id/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Profile getById(@PathParam("id") int id) {
		return ProfileService.getById(id);
	}
	
	@GET
	@Path("/name/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Profile getByName(@PathParam("name") String name) {
		return ProfileService.getByName(name);
	}
	
	
		
	@DELETE
	@Path("/delete/{id}")
	public Response delete(@PathParam("id") int id) {
		try {
			ProfileService.delete(ProfileService.getById(id));
		} catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.ok().build();
	}
	
	@POST
	@Consumes("application/json")
	public Response create(Profile Profile) {
		try {
			ProfileService.create(Profile);
		} catch(IllegalArgumentException i) {
			return Response.status(Status.BAD_REQUEST).build();
		} catch(Exception e) {
			return Response.status(Status.BAD_GATEWAY).build();
		}
		
		
		return Response.ok().build();
	}
	
	@PUT
	@Consumes("application/json")
	public Response update(Profile Profile) {
		try {
			ProfileService.update(Profile);
		
		} catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		
		return Response.ok().build();
	}

}