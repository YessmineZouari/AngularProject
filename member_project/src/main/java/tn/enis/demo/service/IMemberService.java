package tn.enis.demo.service;
import tn.enis.demo.entities.Member;

import java.util.List;

import tn.enis.demo.beans.PublicationBean;
import tn.enis.demo.entities.EnseignantChercheur;
import tn.enis.demo.entities.Etudiant;

public interface IMemberService {
	
	public Member addMember(Member m);
	public void deleteMember(Long id) ;
	public Member updateMember(Member p) ;
	public Member findMember(Long id) ;
	public List<Member> findAll();

	public Member findByCin(String cin);
	public Member findByEmail(String email);
	public List<Member> findByNom(String nom);
	
	public List<Etudiant> findByDiplome(String diplome);
	
	public List<EnseignantChercheur> findByGrade(String grade);
	public List<EnseignantChercheur> findByEtablissement(String
	etablissement);
	public void affecterEtudiantToEnseignant(Long idE,Long idENS);
	public void affecterauteurTopublication(Long idauteur, Long idpub);
	public List<PublicationBean> findPublicationparauteur(Long idauteur);
	public List<Etudiant> checherByEndrant(EnseignantChercheur ens);
	public void affecterMembreToEvent(Long memberId, Long eventId);
	}
