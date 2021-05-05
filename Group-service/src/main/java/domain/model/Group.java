package domain.model;

import java.io.Serializable;



import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.SequenceGenerator;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import lombok.Data;


@Data
@Entity
@Table(name = "Groups")
public class Group implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "seq_id", sequenceName = "seq_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_id")	
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	@NotNull
	private String name;
	
	@Column(name = "Host")
	@NotNull
	private String Host;	
	
	@Column(name = "member1")
	private int member1;
	
	@Column(name = "member2")
	private int member2;
	
	
	
	
	
	
	public Group() {}
	
	
	public Group(String name, String Host,int member1,int member2) {
		this.name = name;
		this.Host = Host;
		this.member1 = member1;
		this.member2 = member2;
 		
		
		
	}
	
	public int getid() {
		return this.id;
	}
	
	public String getname() {
		return this.name;
	}
	
	public String getHost() {
		return this.Host;
	}
	
	
	
	public void setname(String name) {
		 this.name = name;
	}
	
	public void setHost(String Host) {
		 this.Host = Host;
	}
}
