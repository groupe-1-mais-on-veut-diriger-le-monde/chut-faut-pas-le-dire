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

import domain.model.Group;
import domain.service.GroupService;


@ApplicationScoped
@Path("/Groups")
public class GroupRestService {
	
	@Inject
	private GroupService GroupService;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Group> getAll() {
		return GroupService.getAll();
	}
	
	@GET
	@Path("/id/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Group getById(@PathParam("id") int id) {
		return GroupService.getById(id);
	}
	
	@GET
	@Path("/name/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Group getByName(@PathParam("name") String name) {
		return GroupService.getByName(name);
	}
	

		
	@DELETE
	@Path("/delete/{id}")
	public Response delete(@PathParam("id") int id) {
		try {
			GroupService.delete(GroupService.getById(id));
		} catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.ok().build();
	}
	
	@POST
	@Consumes("application/json")
	public int create(Group Group) {
		
			 return GroupService.create(Group);
	}
	
	@PUT
	@Consumes("application/json")
	public Response update(Group Group) {
		try {
			GroupService.update(Group);
		
		} catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		
		return Response.ok().build();
	}
	
	@PUT
	@Path("/join/{idgroup}/{idprofile}")	
	public int join(@PathParam("idgroup") int idgroup, @PathParam("idprofile") int idprofile) {
		
		return GroupService.join(idgroup , idprofile);
	}

}