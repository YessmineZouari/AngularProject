package tn.enis.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tn.enis.demo.entities.Etudiant;
import tn.enis.demo.entities.Member;


public interface MemberRepository extends JpaRepository<Member, Long> {
	

	Member findByCin(String cin);

	List<Member> findByNomStartingWith(String caractere);
	

	Member findByEmail(String email);

	List<Member> findByNom(String nom);

}
