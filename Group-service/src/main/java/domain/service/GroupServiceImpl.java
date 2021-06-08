package domain.service;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Default;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import domain.model.Group;

import lombok.extern.java.Log;

@Default
@Transactional
@ApplicationScoped
@Log
public class GroupServiceImpl implements GroupService {
	
	@PersistenceContext(unitName = "GroupsPU")
	private EntityManager em;
	
	@Override
	public List<Group> getAll() {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Group> criteria = builder.createQuery(Group.class);
		criteria.from(Group.class);
		return em.createQuery(criteria).getResultList();
	}
	
	@Override
	public Group getById(int id) {
		return em.find(Group.class, id);
	}

	
	@Override
	public Group getByName(String name) {
		//log.info("Get unit by Group name");
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Group> criteria = builder.createQuery(Group.class);
		Root<Group> i = criteria.from(Group.class);
		criteria.select(i).where(builder.equal(i.get("name"),name));
		return em.createQuery(criteria).getSingleResult();
	}
	
	@Override
	public void update(Group Group) {
		Group i = em.find(Group.class, Group.getid());
		if (i == null) {
			throw new IllegalArgumentException("AUser does not exist : " + Group.getid());
		}
		em.merge(Group);
	}
	
	@Override
	public int join(int idgroup,int idprofil) {
		Group i = em.find(Group.class, idgroup);
		int a = 0;
		if ( i.getmember1() == 0) {
			i.setmember1(idprofil);
			em.merge(i);
			a = 1;
		}
		else if (i.getmember2() == 0) {
			i.setmember2(idprofil);
			em.merge(i);
			a = 2;
		}
		
		else if (i.getmember3() == 0) {
			i.setmember3(idprofil);
			em.merge(i);
			a = 3;
		}
		else if (i.getmember4() == 0) {
			i.setmember4(idprofil);
			em.merge(i);
			a = 4;
		}
		else if (i.getmember5() == 0) {
			i.setmember5(idprofil);
			em.merge(i);
			a = 5;
		}
		return a;
	}
	
	@Override
	public int exit(int idgroup,int member) {
		Group i = em.find(Group.class, idgroup);
		
		if ( member == 1) {
			i.setmember1(0);
			em.merge(i);
		
		}
		else if (member== 2) {
			i.setmember2(0);
			em.merge(i);
		
		}
		
		else if (member == 3) {
			i.setmember3(0);
			em.merge(i);
		
		}
		else if (member == 4) {
			i.setmember4(0);
			em.merge(i);
	
		}
		else if (member == 5) {
			i.setmember5(0);
			em.merge(i);
		
		}
		return 1;
	}
	
	@Override
	public int status(int idgroup,String state) {
		Group i = em.find(Group.class, idgroup);
		
		
			i.setname(state);
			em.merge(i);
		
	
		return 1;
	}
	
	@Override
	public int create(Group Group) {
	
		if(em.contains(Group)) {
			throw new IllegalArgumentException("Group already exists");
		}
		em.persist(Group);
		em.flush();
		return Group.getid();
	}
	
	@Override
	public void delete(Group Group) {		
		em.remove(em.contains(Group) ? Group : em.merge(Group));
	}
	
	@Override
	public boolean existByName(String name) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Group> criteria = builder.createQuery(Group.class);
		Root<Group> i = criteria.from(Group.class);
		criteria.select(i).where(builder.equal(i.get("name"),name));
		if(em.createQuery(criteria).getResultList().isEmpty()) {
			return false;
		}
		return true;
	}
	
	
	
}