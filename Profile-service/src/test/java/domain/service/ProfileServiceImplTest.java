package domain.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import domain.model.Profile;
import eu.drus.jpa.unit.api.JpaUnit;

@ExtendWith(JpaUnit.class)
@ExtendWith(MockitoExtension.class)
public class ProfileServiceImplTest {
	
	@Spy
	@PersistenceContext(unitName = "ProfilesPUTest")
	EntityManager em;

	@InjectMocks
	private ProfileServiceImpl ProfileServiceImpl;

	@Test
    public void testGetAll() {
        List<Profile> Profiles = ProfileServiceImpl.getAll();
        int size = Profiles.size();

        Profile i = getRandomProfile();
        Profile i2 = getRandomProfile();
        ProfileServiceImpl.create(i);
        ProfileServiceImpl.create(i2);

        assertEquals(size + 2, ProfileServiceImpl.getAll().size());
    }
	
	
	@Test
	public void testGetById() {
		initDataStore();
		List<Profile> Profiles = ProfileServiceImpl.getAll();
		if(Profiles.isEmpty()) {
			Profiles.add(getRandomProfile());
		}
		int id = Profiles.get(0).getid();
		Profile Profile = ProfileServiceImpl.getById(id);
		assertEquals(Profiles.get(0).getid(), Profile.getid());
		assertEquals(Profiles.get(0).getname(), Profile.getname());
	}
	
	@Test
	public void testGetByName() {
		List<Profile> Profiles = ProfileServiceImpl.getAll();
		if(Profiles.isEmpty()) {
			Profiles.add(getRandomProfile());
		}
		ProfileServiceImpl.create(Profiles.get(0));
		String name = Profiles.get(0).getname();
		assertNotNull(ProfileServiceImpl.getByName(Profiles.get(0).getname()));
		assertEquals(name, ProfileServiceImpl.getByName(name).getname());
	}
	
	
	
	@Test
	public void testCreate() {
		Profile Profile = getRandomProfile();
		ProfileServiceImpl.create(Profile);
		Profile i = em.find(Profile.class, Profile.getid());
		assertTrue(Profile.equals(i));
		IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
				() -> ProfileServiceImpl.create(Profile),"Profile already exists");
		assertTrue(thrown.getMessage().contains("Profile already exists"));
	}

	@Test
	public void testDelete() {
		Profile Profile = getRandomProfile();
		ProfileServiceImpl.create(Profile);
		ProfileServiceImpl.delete(Profile);
		Profile i = em.find(Profile.class, Profile.getid());
		assertTrue(i == null);
	}
	
	@Test
	public void testExistByName() {
		List<Profile> Profiles = ProfileServiceImpl.getAll();
		if(Profiles.isEmpty()) {
			Profiles.add(getRandomProfile());
		}
		String name = Profiles.get(0).getname();
		ProfileServiceImpl.create(Profiles.get(0));
		assertTrue(ProfileServiceImpl.existByName(name));
		ProfileServiceImpl.delete(Profiles.get(0));
		assertFalse(ProfileServiceImpl.existByName(name));
	}

	private List<Profile> getProfiles() {
		List<Profile> Profiles = new ArrayList<>();
		long numberOfProfiles = Math.round((Math.random() * 10)) + 1;
		for(int i = 0; i < numberOfProfiles; i++) {
			Profiles.add(getRandomProfile());
		}
		return Profiles;
	}
	

	private Profile getRandomProfile() {
		Profile Profile = new Profile(UUID.randomUUID().toString(), UUID.randomUUID().toString(), 
				ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2)
				, ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2)
				, ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2)
				, ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2)
				, ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2)
				, ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2),
				ThreadLocalRandom.current().nextInt(0, 2), ThreadLocalRandom.current().nextInt(0, 2), 
				UUID.randomUUID().toString());
		return Profile;
	}
	
	private int initDataStore() {
		int size = ProfileServiceImpl.getAll().size();
		List<Profile> Profiles = getProfiles();
		for (Profile Profile : Profiles) {
			ProfileServiceImpl.create(Profile);
		}
		return size + Profiles.size();
	}
	
	
}
