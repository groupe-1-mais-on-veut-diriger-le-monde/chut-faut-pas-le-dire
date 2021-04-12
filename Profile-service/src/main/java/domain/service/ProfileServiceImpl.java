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

import domain.model.Profile;
import lombok.extern.java.Log;

@Default
@Transactional
@ApplicationScoped
@Log
public class ProfileServiceImpl implements ProfileService {
	
	@PersistenceContext(unitName = "ProfilesPU")
	private EntityManager em;
	
	@Override
	public List<Profile> getAll() {
		//log.info("Get all Profiles");
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Profile> criteria = builder.createQuery(Profile.class);
		criteria.from(Profile.class);
		return em.createQuery(criteria).getResultList();
	}
	
	@Override
	public Profile getById(int id) {
		//log.info("Get an Profile by id");
		return em.find(Profile.class, id);
	}
	
	@Override
	public Profile getByName(String name) {
		//log.info("Get unit by Profile name");
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Profile> criteria = builder.createQuery(Profile.class);
		Root<Profile> i = criteria.from(Profile.class);
		criteria.select(i).where(builder.equal(i.get("name"),name));
		return em.createQuery(criteria).getSingleResult();
	}
	
	
	
	@Override
	public int create(Profile Profile) {
		//log.info("Create an Profile");
		if(em.contains(Profile)) {
			throw new IllegalArgumentException("Profile already exists");
		}
		em.persist(Profile);
		em.flush();
		return 1;
	}
	
	@Override
	public void delete(Profile Profile) {
		//log.info("Delete an Profile");
		em.remove(em.contains(Profile) ? Profile : em.merge(Profile));
	}
	
	@Override
	public boolean existByName(String name) {
		//log.info("Check if an Profile exists");
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Profile> criteria = builder.createQuery(Profile.class);
		Root<Profile> i = criteria.from(Profile.class);
		criteria.select(i).where(builder.equal(i.get("name"),name));
		if(em.createQuery(criteria).getResultList().isEmpty()) {
			return false;
		}
		return true;
	}
	
}