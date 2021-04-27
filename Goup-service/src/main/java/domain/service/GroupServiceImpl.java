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
		//log.info("Get all Groups");
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Group> criteria = builder.createQuery(Group.class);
		criteria.from(Group.class);
		return em.createQuery(criteria).getResultList();
	}
	
	@Override
	public Group getById(int id) {
		//log.info("Get an Group by id");
		return em.find(Group.class, id);
	}
	
	//verssion simplifier a voir ce qui est mieux
		//@Override
		//public Group getByName(String name)   {
			//log.info("Get an Group by name");
		//	return em.find(Group.class, name);
		//}
	
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
	public int create(Group Group) {
		//log.info("Create an Group");
		if(em.contains(Group)) {
			throw new IllegalArgumentException("Group already exists");
		}
		em.persist(Group);
		em.flush();
		return Group.getid();
	}
	
	@Override
	public void delete(Group Group) {
		//log.info("Delete an Group");
		em.remove(em.contains(Group) ? Group : em.merge(Group));
	}
	
	@Override
	public boolean existByName(String name) {
		//log.info("Check if an Group exists");
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