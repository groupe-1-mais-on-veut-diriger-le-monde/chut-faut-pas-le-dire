package domain.model;


import java.io.Serializable;


import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;


@Data
@Entity
@Table(name = "Profile")
public class Profile implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "seq_id", sequenceName = "seq_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_id")	
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	@NotNull
	private String name;
	
	@Column(name = "age")
	@NotNull
	private int age;
	
	@Column(name = "genre1")	
	private String genre1;
	
	@Column(name = "genre2")
	private String genre2;
	
	@Column(name = "genre3")
	private String genre3;
	
	
	@Column(name = "host")
	private int host;
	
	@Column(name = "Group1")
	private int Group1;
	
	@Column(name = "vote")
	private String vote;
	
	
	
	
	
	
	public Profile() {}
	
	
	public Profile(String name,int age,String genre1,String genre2,String genre3,int host,int Group1,String vote){
		this.name = name;
		this.age = age;
		this.genre1 = genre1;
		this.genre2 = genre2;
		this.genre3 = genre3;
		this.host = host;
		this.Group1 = Group1;
		this.vote = vote;
		
		
		
		
	}
	
	public int getid() {
		return this.id;
	}
	
	public String getname() {
		return this.name;
	}
	

	
	
	
	
	
	
	public void setname(String name) {
		 this.name = name;
	}
	
	
	
	
}
