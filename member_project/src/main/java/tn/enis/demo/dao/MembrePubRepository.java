package tn.enis.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tn.enis.demo.entities.MembrePubId;
import tn.enis.demo.entities.MembrePublication;

public interface MembrePubRepository extends JpaRepository<MembrePublication, MembrePubId> {
	@Query("select m from MembrePublication m where m.id.auteur_id=:x")
	List<MembrePublication> findpubId(@Param("x") Long autId);
}
