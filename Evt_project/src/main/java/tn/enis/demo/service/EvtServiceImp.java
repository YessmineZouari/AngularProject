package tn.enis.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import tn.enis.demo.dao.EvtRepository;
import tn.enis.demo.entities.Evt;

@Service
@AllArgsConstructor
public class EvtServiceImp implements IEvtService{
	EvtRepository repository;

	@Override
	public Evt addEvt(Evt m) {
		// TODO Auto-generated method stub
		repository.save(m);
		return m;
	}

	@Override
	public void deleteEvt(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
		
	}

	@Override
	public Evt updateEvt(Evt p) {
		// TODO Auto-generated method stub
		
		return repository.saveAndFlush(p);
	}

	@Override
	public Evt findEvt(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	public List<Evt> findAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public List<Evt> findByLieu(String lieu) {
		// TODO Auto-generated method stub
		return repository.findByLieu(lieu);
	}

	@Override
	public List<Evt> findByDate(Date date) {
		// TODO Auto-generated method stub
		return repository.findByDate(date);
	}

	@Override
	public List<Evt> findByTitre(String titre) {
		// TODO Auto-generated method stub
		return repository.findByTitre(titre);
	}
	

	

	

}
