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

import domain.model.Group;

import eu.drus.jpa.unit.api.JpaUnit;

@ExtendWith(JpaUnit.class)
@ExtendWith(MockitoExtension.class)
 class GroupServiceImplTest {
	
	@Spy
	@PersistenceContext(unitName = "GroupsPUTest")
	EntityManager em;

	@InjectMocks
	private GroupServiceImpl GroupServiceImpl;

	@Test
     void testGetAll() {
        List<Group> Groups = GroupServiceImpl.getAll();
        int size = Groups.size();

        Group i = getRandomGroup();
        Group i2 = getRandomGroup();
        GroupServiceImpl.create(i);
        GroupServiceImpl.create(i2);

        assertEquals(size + 2, GroupServiceImpl.getAll().size());
    }
	
	
	@Test
	 void testGetById() {
		initDataStore();
		List<Group> Groups = GroupServiceImpl.getAll();
		if(Groups.isEmpty()) {
			Groups.add(getRandomGroup());
		}
		int id = Groups.get(0).getid();
		Group Group = GroupServiceImpl.getById(id);
		assertEquals(Groups.get(0).getid(), Group.getid());
		assertEquals(Groups.get(0).getname(), Group.getname());
	}
	
	@Test
	 void testGetByName() {
		List<Group> Groups = GroupServiceImpl.getAll();
		if(Groups.isEmpty()) {
			Groups.add(getRandomGroup());
		}
		GroupServiceImpl.create(Groups.get(0));
		String name = Groups.get(0).getname();
		assertNotNull(GroupServiceImpl.getByName(Groups.get(0).getname()));
		assertEquals(name, GroupServiceImpl.getByName(name).getname());
	}
	
	
	
	@Test
	 void testCreate() {
		Group Group = getRandomGroup();
		GroupServiceImpl.create(Group);
		Group i = em.find(Group.class, Group.getid());
		assertTrue(Group.equals(i));
		IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
				() -> GroupServiceImpl.create(Group),"Group already exists");
		assertTrue(thrown.getMessage().contains("Group already exists"));
	}
	
	
	@Test
	 void testUpdate() {
		GroupServiceImpl.create(getRandomGroup());
		Group Group = GroupServiceImpl.getAll().get(0);
	  assertNotNull(Group);
	  int id = Group.getid();
	  Group.setname("jan");
	  GroupServiceImpl.update(Group);
	  Group = GroupServiceImpl.getById(id);
	  assertEquals("jan", Group.getname());
	 }

	@Test
	 void testDelete() {
		Group Group = getRandomGroup();
		GroupServiceImpl.create(Group);
		GroupServiceImpl.delete(Group);
		Group i = em.find(Group.class, Group.getid());
		assertTrue(i == null);
	}
	
	@Test
	 void testExistByName() {
		List<Group> Groups = GroupServiceImpl.getAll();
		if(Groups.isEmpty()) {
			Groups.add(getRandomGroup());
		}
		String name = Groups.get(0).getname();
		GroupServiceImpl.create(Groups.get(0));
		assertTrue(GroupServiceImpl.existByName(name));
		GroupServiceImpl.delete(Groups.get(0));
		assertFalse(GroupServiceImpl.existByName(name));
	}

	private List<Group> getGroups() {
		List<Group> Groups = new ArrayList<>();
		long numberOfGroups = Math.round((Math.random() * 10)) + 1;
		for(int i = 0; i < numberOfGroups; i++) {
			Groups.add(getRandomGroup());
		}
		return Groups;
	}
	

	private Group getRandomGroup() {
		Group Group = new Group(UUID.randomUUID().toString(), UUID.randomUUID().toString(),ThreadLocalRandom.current().nextInt(0, 2),ThreadLocalRandom.current().nextInt(0, 2),ThreadLocalRandom.current().nextInt(0, 2),ThreadLocalRandom.current().nextInt(0, 2),ThreadLocalRandom.current().nextInt(0, 2));
		return Group;
	}
	
	private int initDataStore() {
		int size = GroupServiceImpl.getAll().size();
		List<Group> Groups = getGroups();
		for (Group Group : Groups) {
			GroupServiceImpl.create(Group);
		}
		return size + Groups.size();
	}
	
	
}
