package tn.enis.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import tn.enis.demo.dao.PublicationRepository;
import tn.enis.demo.entities.Publication;

@Service
@AllArgsConstructor
public class PubServiceImp implements IMPubService{
	PublicationRepository publicationRepository;

	@Override
	public Publication addPublication(Publication p) {
		publicationRepository.save(p);
		
		return p;
	}

	
	@Override
	public void deletePublication(Long id) {
		publicationRepository.deleteById(id);
		// TODO Auto-generated method stub
		
	}

	@Override
	public Publication updatePublication(Publication p) {
		
		// TODO Auto-generated method stub
		return publicationRepository.saveAndFlush(p);
	}

	@Override
	public Publication findPublication(Long id) {
		// TODO Auto-generated method stub
		return publicationRepository.findById(id).get();
	}

	@Override
	public List<Publication> findAll() {
		// TODO Auto-generated method stub
		return publicationRepository.findAll();
	}

	@Override
	public List<Publication> findByLieu(String lieu) {
		// TODO Auto-generated method stub
		return publicationRepository.findByLieu(lieu);
	}


	@Override
	public List<Publication> findByType(String type) {
		
		return publicationRepository.findByType(type);
	}

	

}
