package tn.enis.demo.service;

import java.util.List;

import tn.enis.demo.entities.Publication;



public interface IMPubService {
	public Publication addPublication(Publication p);
	public void deletePublication(Long id) ;
	public Publication updatePublication(Publication p) ;
	public Publication findPublication(Long id) ;
	public List<Publication> findAll();

	public List<Publication> findByLieu(String lieu);
	public List<Publication> findByType(String type);

}
