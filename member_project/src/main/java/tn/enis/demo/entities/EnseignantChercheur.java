package tn.enis.demo.entities;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @DiscriminatorValue("ens")
@Getter @Setter
@NoArgsConstructor
public class EnseignantChercheur extends Member{
	private String grade;
	private String etablissement;
	@Builder
	public EnseignantChercheur( String cin,  String nom,  String prenom,  Date dateNaissance,
			 String cv,  String email,  String pasword,String grade,String etablissement) {
		super(cin, nom, prenom, dateNaissance, cv, email, pasword);
		// TODO Auto-generated constructor stub
		this.grade=grade;
		this.etablissement=etablissement;
	}
	
	
}
