package domain.model;

import java.io.Serializable;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.SequenceGenerator;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import lombok.Data;
import domain.model.Member;

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
	
	
	//@OneToMany( cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true )
	//@JoinColumn(name="member_id")
	//private ArrayList<Member> member;
	
	
	
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
