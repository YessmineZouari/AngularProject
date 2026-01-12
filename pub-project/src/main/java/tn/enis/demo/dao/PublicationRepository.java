package tn.enis.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import tn.enis.demo.entities.Publication;

public interface PublicationRepository extends JpaRepository<Publication, Long> {

	public List<Publication> findByLieu(String lieu);
	
	public List<Publication> findByType(String type);


	
	
}
