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
	private ArrayList<String> Group ;
	
	@Column(name = "A voir")
	@NotNull
	private String A_voir;
	
	
	
	public Profile() {}
	
	
	public Profile(String name, String surname, int comedy, int sci,int Horror,int romance,int action,int thriller,int drama,int mystery,int crime,int animation,int adventure,int fantasy,int comdedy_Romance,int action_comedy,int superhero,String A_voir) {
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
		this.Group = new ArrayList<String>();
		this.A_voir = A_voir;
		
		
		
	}
	
	public int getid() {
		return this.id;
	}
	
	public String getname() {
		return this.name;
	}
	
	public String getsurname() {
		return this.surname;
	}
	
	public int getcomedy() {
		return this.comedy;
	}
	
	public int getromance() {
		return this.romance;
	}
	public int getaction() {
		return this.action;
	}
	public int getmystery() {
		return this.mystery;
	}
	public int getdrama() {
		return this.drama;
	}
	public int getcrime() {
		return this.crime;
	}
	public int getanimation() {
		return this.animation;
	}
	public int getadventure() {
		return this.adventure;
	}
	public int getfantasy() {
		return this.fantasy;
	}
	public int getcomdedy_Romance() {
		return this.comdedy_Romance;
	}
	public int getaction_comedy() {
		return this.action_comedy;
	}
	public int getsuperhero() {
		return this.superhero;
	}
	public String getA_voir() {
		return this.A_voir;
	}
	public ArrayList<String> getGroup() {
		return this.Group;
	}
	public void addGroup(String group){
		 this.Group.add(group);
	}
	public void removeGroup(String group){
		 this.Group.remove(group);
	}
	
	
	
	public void setname(String name) {
		 this.name = name;
	}
	
	public void setsurname(String surname) {
		 this.surname = surname;
	}
	
	public void setcomedy(int comedy) {
		 this.comedy = comedy;
	}
	
	public void setromance(int romance) {
		 this.romance =romance;
	}
	public void setaction(int action) {
		 this.action = action;
	}
	public void setmystery(int mystery) {
		 this.mystery= mystery;
	}
	public void setdrama(int drama) {
		 this.drama =drama;
	}
	public void setcrime(int crime) {
		 this.crime = crime;
	}
	public void setanimation(int animation) {
		 this.animation = animation;
	}
	public void setadventure(int adventure) {
		 this.adventure = adventure;
	}
	public void setfantasy(int fantasy) {
		 this.fantasy = fantasy;
	}
	public void setcomdedy_Romance(int comdedy_Romance) {
		 this.comdedy_Romance = comdedy_Romance;
	}
	public void setaction_comedy(int action_comedy) {
		 this.action_comedy= action_comedy;
	}
	public void setsuperhero(int superhero) {
		 this.superhero = superhero;
	}
	public void setA_voir(String a_voir) {
		 this.A_voir = a_voir;
    }
}
