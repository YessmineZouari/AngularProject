package tn.enis.demo.controller;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import tn.enis.demo.entities.EnseignantChercheur;
import tn.enis.demo.entities.Etudiant;
import tn.enis.demo.entities.Member;
import tn.enis.demo.service.IMemberService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MemberRestController {
	IMemberService memberService;

	@RequestMapping(value = "/membres", method = RequestMethod.GET)
	public List<Member> findMembres() {
		return memberService.findAll();
	}

	@GetMapping(value = "/membres/{id}")
	public Member findOneMemberById(@PathVariable("id") Long id) {
		return memberService.findMember(id);
	}

	@GetMapping(value = "/membres/search/cin")
	public Member findOneMemberByCin(@RequestParam("cin") String cin) {
		return memberService.findByCin(cin);
	}

	@GetMapping(value = "/membres/search/email")
	public Member findOneMemberByEmail(@RequestParam("email") String email) {
		return memberService.findByEmail(email);
	}

	@PostMapping(value = "/membres/enseignant")
	public Member addMembre(@RequestBody EnseignantChercheur m) {
		return memberService.addMember(m);
	}

	@PostMapping(value = "/membres/etudiant")
	public Member addMembre(@RequestBody Etudiant e) {
		return memberService.addMember(e);
	}

	@DeleteMapping(value = "/membres/{id}")
	public void deleteMembre(@PathVariable("id") Long id) {

		memberService.deleteMember(id);

	}

	@PutMapping(value = "/membres/etudiant/{id}")
	public Member updatemembre(@PathVariable("id") Long id, @RequestBody Etudiant p) {

		p.setId(id);
		return memberService.updateMember(p);

	}

	@PutMapping(value = "/membres/enseignant/{id}")
	public Member updateMembre(@PathVariable("id") Long id, @RequestBody EnseignantChercheur p) {

		p.setId(id);
		return memberService.updateMember(p);

	}

	@PutMapping("/etudiants/affecter/{idE}/{idENS}")
	public void affecterEtudiantToEnseignant(@PathVariable Long idE, @PathVariable Long idENS) {

		memberService.affecterEtudiantToEnseignant(idE, idENS);
	}

	@GetMapping("/fullmember/{id}")
	public Member findAFullMember(@PathVariable(name = "id") Long id) {
	    Member mbr = memberService.findMember(id);
	    mbr.setPubs(memberService.findPublicationparauteur(id));
	    return mbr;
	}
}
