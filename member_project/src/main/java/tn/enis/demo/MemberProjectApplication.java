package tn.enis.demo;

import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import lombok.AllArgsConstructor;
import tn.enis.demo.beans.PublicationBean;
import tn.enis.demo.entities.EnseignantChercheur;
import tn.enis.demo.entities.Etudiant;
import tn.enis.demo.proxies.PublicationsProxies;
import tn.enis.demo.service.MembreServiceImp;

@SpringBootApplication
@AllArgsConstructor
@EnableDiscoveryClient
@EnableFeignClients
public class MemberProjectApplication implements CommandLineRunner {
	
	MembreServiceImp serviceImp;
	PublicationsProxies proxies;

	public static void main(String[] args) {
		SpringApplication.run(MemberProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		// ========== CREATE STUDENTS ==========
		Etudiant etd1 = Etudiant.builder()
				.cin("123456")
				.dateInscription(new Date())
				.dateNaissance(new Date())
				.diplome("mastère")
				.email("etd1@gmail.com")
				.pasword("pass1")
				.encadrant(null)
				.cv("cv1")
				.nom("abid")
				.prenom("youssef")
				.sujet("blockchain")
				.build();
		
		Etudiant etd2 = Etudiant.builder()
				.cin("1234567")
				.dateInscription(new Date())
				.dateNaissance(new Date())
				.diplome("ingénieur")
				.email("etd2@gmail.com")
				.pasword("pass2")
				.encadrant(null)
				.cv("cv2")
				.nom("ellouze")
				.prenom("oussema")
				.sujet("info")
				.build();
		
		Etudiant etd3 = Etudiant.builder()
				.cin("123458")
				.dateInscription(new Date())
				.dateNaissance(new Date())
				.diplome("mastère")
				.email("etd3@gmail.com")
				.pasword("pass3")
				.encadrant(null)
				.cv("cv3")
				.nom("ellouze")
				.prenom("youssef")
				.sujet("blockchain")
				.build();
		
		// ========== CREATE TEACHERS ==========
		EnseignantChercheur ens1 = EnseignantChercheur.builder()
				.cin("123456")
				.dateNaissance(new Date())
				.email("ens1@gmail.com")
				.pasword("pass1")
				.grade("maitre assistant")
				.etablissement("Enis")
				.cv("cv1")
				.nom("nom_ens1")
				.prenom("prenom_ens1")
				.build();
		
		EnseignantChercheur ens2 = EnseignantChercheur.builder()
				.cin("1234567")
				.dateNaissance(new Date())
				.email("ens2@gmail.com")
				.pasword("pass2")
				.grade("professeur")
				.cv("cv2")
				.etablissement("Enis")
				.nom("nom_ens2")
				.prenom("prenom_ens2")
				.build();
		
		// ========== SAVE MEMBERS TO DATABASE ==========
		System.out.println("========== Creating Members ==========");
		serviceImp.addMember(etd1);
		serviceImp.addMember(etd2);
		serviceImp.addMember(etd3);
		serviceImp.addMember(ens1);
		serviceImp.addMember(ens2);
		System.out.println("✅ 5 Members created successfully!");
		
		// ========== TEST FEIGN CLIENT - FETCH PUBLICATION FROM PUBSERVICE ==========
		System.out.println("\n========== Testing Feign Client ==========");
		try {
			PublicationBean pub = proxies.getPublicationById(1L);
			System.out.println("✅ Publication fetched: " + pub.getTitre());
		} catch (Exception e) {
			System.err.println("❌ Error fetching publication: " + e.getMessage());
			System.err.println("Make sure PubService is running on port 8084!");
		}
		
		// ========== CREATE MEMBER-PUBLICATION ASSOCIATIONS ==========
		System.out.println("\n========== Creating Member-Publication Associations ==========");
		try {
			// Student 1 (etd1) authors publications 1 and 2
			serviceImp.affecterauteurTopublication(1L, 1L);
			serviceImp.affecterauteurTopublication(1L, 2L);
			serviceImp.affecterauteurTopublication(1L, 1L);
			serviceImp.affecterMembreToEvent(1L, 2L);
			System.out.println("✅ Student 1 (abid youssef) linked to publications 1 and 2");
			
			// Student 2 (etd2) authors publication 1
			serviceImp.affecterauteurTopublication(2L, 1L);
			System.out.println("✅ Student 2 (ellouze oussema) linked to publication 1");
			
			// Student 3 (etd3) authors publication 3
			serviceImp.affecterauteurTopublication(3L, 3L);
			System.out.println("✅ Student 3 (ellouze youssef) linked to publication 3");
			
			// Teacher 1 (ens1) supervises publication 2
			serviceImp.affecterauteurTopublication(4L, 2L);
			System.out.println("✅ Teacher 1 (ens1) linked to publication 2");
			
			// Teacher 2 (ens2) supervises publications 1 and 3
			serviceImp.affecterauteurTopublication(5L, 1L);
			serviceImp.affecterauteurTopublication(5L, 3L);
			System.out.println("✅ Teacher 2 (ens2) linked to publications 1 and 3");
			
			System.out.println("\n✅ All associations created successfully!");
			
		} catch (Exception e) {
			System.err.println("❌ Error creating associations: " + e.getMessage());
			e.printStackTrace();
		}
		
		
		
		System.out.println("\n========== Application Started Successfully ==========");
	}
}