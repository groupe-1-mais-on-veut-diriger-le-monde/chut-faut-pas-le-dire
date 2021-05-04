package domain.model;



import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.ElementCollection;
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
@Table(name ="Member")
public class Member implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "seq_id", sequenceName = "seq_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_id")	
	@Column(name = "id")
	private int id;
	

	@Column(name = "name")
	@NotNull
	private String name;
	
	@Column(name = "Id_member")
	@NotNull
	private int Id_member;

	

	

	public Member(String name ,int Id_member){
		
		this.name = name;
		this.Id_member = Id_member;
		
  }

}