package domain.service;

import java.util.List;

import domain.model.Group;

public interface GroupService {
	
	public List<Group> getAll();
	
	public Group getById(int id);
	
	public Group getByName(String name);
	
	
	
	public int create(Group Group);
	
	public void delete(Group Group);
	
	public boolean existByName(String name);

	void update(Group Group);
	
	public int join(int idgroup,int idprofil);
	
	public int exit(int idgroup,int member);
	
	public int status(int idgroup,String state);
	
}