package tn.enis.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import tn.enis.demo.beans.PublicationBean;
import tn.enis.demo.dao.EnseignantChercheurRepository;
import tn.enis.demo.dao.EtudiantRepository;
import tn.enis.demo.dao.MemberRepository;
import tn.enis.demo.dao.MembreEvtRepository;
import tn.enis.demo.dao.MembrePubRepository;
import tn.enis.demo.entities.EnseignantChercheur;
import tn.enis.demo.entities.Etudiant;
import tn.enis.demo.entities.Member;
import tn.enis.demo.entities.MembreEvent;
import tn.enis.demo.entities.MembreEvtId;
import tn.enis.demo.entities.MembrePubId;
import tn.enis.demo.entities.MembrePublication;
import tn.enis.demo.proxies.PublicationsProxies;

@Service
@AllArgsConstructor
public class MembreServiceImp implements IMemberService {
	MemberRepository memberRepository;
	EnseignantChercheurRepository enseignantChercheurRepository;
	EtudiantRepository etudiantRepository;
	MembrePubRepository membrePubRepository;
	PublicationsProxies proxies;
	MembreEvtRepository membreEvtRepository;

	@Override
	public Member addMember(Member m) {
		memberRepository.save(m);
		return m;

	}

	@Override
	public void deleteMember(Long id) {
		// TODO Auto-generated method stub
		memberRepository.deleteById(id);

	}

	@Override
	public Member updateMember(Member p) {
		return memberRepository.saveAndFlush(p);
	}

	@Override
	public Member findMember(Long id) {
		return memberRepository.findById(id).get();
	}

	@Override
	public List<Member> findAll() {
		return memberRepository.findAll();
	}

	@Override
	public Member findByCin(String cin) {
		return memberRepository.findByCin(cin);
	}

	@Override
	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email);
	}

	@Override
	public List<Member> findByNom(String nom) {
		return memberRepository.findByNom(nom);
	}

	@Override
	public List<Etudiant> findByDiplome(String diplome) {
		return etudiantRepository.findByDiplome(diplome);
	}

	@Override
	public List<EnseignantChercheur> findByGrade(String grade) {
		return enseignantChercheurRepository.findByGrade(grade);
	}

	@Override
	public List<EnseignantChercheur> findByEtablissement(String etablissement) {
		return enseignantChercheurRepository.findByEtablissement(etablissement);
	}

	@Override
	public void affecterEtudiantToEnseignant(Long idE, Long idENS) {

		Etudiant e = etudiantRepository.findById(idE).get();
		e.setEncadrant(enseignantChercheurRepository.findById(idENS).get());
		etudiantRepository.saveAndFlush(e);

	}

	@Override
	public List<Etudiant> checherByEndrant(EnseignantChercheur ens) {

		return etudiantRepository.findByEncadrant(ens);
	}

	@Override
	public void affecterauteurTopublication(Long idauteur, Long idpub) {
		// TODO Auto-generated method stub
		Member mbr = memberRepository.findById(idauteur).get();
		MembrePublication mbs = new MembrePublication();
		mbs.setAuteur(mbr);
		mbs.setId(new MembrePubId(idpub, idauteur));
		membrePubRepository.save(mbs);
		
	}

	@Override
	public List<PublicationBean> findPublicationparauteur(Long idauteur) {
		// TODO Auto-generated method stub
		List<PublicationBean> pubs = new ArrayList<PublicationBean>();
		List<MembrePublication> idpubs = membrePubRepository.findpubId(idauteur);
		idpubs.forEach(s -> {
			System.out.println(s);
			pubs.add(proxies.getPublicationById(s.getId().getPublication_id()));
		});
		return pubs;
	}
	
	@Override
	public void affecterMembreToEvent(Long memberId, Long eventId) {
	    // Find the member
	    Member membre = memberRepository.findById(memberId)
	            .orElseThrow(() -> new RuntimeException("Member not found: " + memberId));
	    
	    // Create composite key
	    MembreEvtId id = new MembreEvtId();
	    id.setMembre_id(memberId);
	    id.setEvent_id(eventId);
	    
	    // Create association
	    MembreEvent me = new MembreEvent();
	    me.setId(id);
	    me.setMembre(membre); // Set the Member object
	    me.setDateParticipation(new Date());
	    
	    // Save to database
	    membreEvtRepository.save(me);
	    
	    System.out.println("✅ Member " + memberId + " linked to Event " + eventId);
	}

}
