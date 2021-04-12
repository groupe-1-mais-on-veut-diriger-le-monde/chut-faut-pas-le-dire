package domain.service;

import java.util.List;

import domain.model.Profile;

public interface ProfileService {
	
	public List<Profile> getAll();
	
	public Profile getById(int id);
	
	public Profile getByName(String name);
	
	
	
	public int create(Profile Profile);
	
	public void delete(Profile Profile);
	
	public boolean existByName(String name);
	
}