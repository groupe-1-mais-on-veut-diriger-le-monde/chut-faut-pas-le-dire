package domain.model;

// import java.util.ArrayList;
import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.SequenceGenerator;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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
	
	@Column(name = "surname")
	@NotNull
	private String surname;
	
	@Column(name = "comedy")
	@NotNull
	private int comedy;
	
	@Column(name = "Horror")
	@NotNull
	private int Horror;
	
	@Column(name = "romance")
	@NotNull
	private int romance;

	@Column(name = "action")
	@NotNull
	private int action;
	
	@Column(name = "thriller")
	@NotNull
	private int thriller;
	
	@Column(name = "drama")
	@NotNull
	private int drama;
	
	@Column(name = "mystery")
	@NotNull
	private int mystery;
	
	@Column(name = "crime")
	@NotNull
	private int crime;	
	
	
	@Column(name = "animation")
	@NotNull
	private int animation;	
	
	@Column(name = "adventure")
	@NotNull
	private int adventure;	
	
	@Column(name = "fantasy")
	@NotNull
	private int fantasy;	
	
	@Column(name = "comdedy_Romance")
	@NotNull
	private int comdedy_Romance;	
	
	@Column(name = "action_comedy")
	@NotNull
	private int action_comedy;	
	
	@Column(name = "superhero")
	@NotNull
	private int superhero;	
	
	@Column(name = "Group")
	private ArrayList<String> Group = new ArrayList<String>();
	
	@Column(name = "A voir")
	@NotNull
	private String A_voir;
	
	
	
	public Profile() {}
	
	
	public Profile(String name, String surname, int comedy, int sci,int Horror,int romance,int action,int thriller,int drama,int mystery,int crime,int animation,int adventure,int fantasy,int comdedy_Romance,int action_comedy,int superhero,String Group,String A_voir) {
		this.name = name;
		this.surname = surname;
		this.comedy = comedy;
		this.Horror = Horror;
		this.romance = romance;
		this.action = action;
		this.thriller = thriller;
		this.drama = drama;
		this.mystery = mystery;
		this.crime = crime;
		this.animation = animation;
		this.adventure = adventure;
		this.fantasy = fantasy;
		this.comdedy_Romance = comdedy_Romance;
		this.action_comedy = action_comedy;
		this.superhero = superhero;
		this.Group.add(Group);
		this.A_voir = A_voir;
		
		
		
	}
	
}
