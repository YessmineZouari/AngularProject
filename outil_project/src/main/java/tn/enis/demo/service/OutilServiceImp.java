package tn.enis.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import tn.enis.demo.dao.OutilRepository;
import tn.enis.demo.entities.Outil;

@Service
@AllArgsConstructor
public class OutilServiceImp implements IOutilService{
	OutilRepository repository;

	@Override
	public Outil addOutil(Outil o) {
		// TODO Auto-generated method stub
		return repository.save(o);
	}

	@Override
	public void deleteOutil(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
		
	}

	@Override
	public Outil updateOutil(Outil o) {
		// TODO Auto-generated method stub
		return repository.saveAndFlush(o);
	}

	@Override
	public Outil findOutil(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	public List<Outil> findAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public List<Outil> findBySource(String source) {
		// TODO Auto-generated method stub
		return repository.findBySource(source);
	}

	@Override
	public List<Outil> findByDate(Date date) {
		// TODO Auto-generated method stub
		return repository.findByDate(date);
	}
	
	

}
