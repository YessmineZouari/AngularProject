package tn.enis.demo.service;

import java.util.Date;
import java.util.List;

import tn.enis.demo.entities.Evt;

public interface IEvtService {
	
	public Evt addEvt(Evt m);
	public void deleteEvt(Long id) ;
	public Evt updateEvt(Evt p) ;
	public Evt findEvt(Long id) ;
	public List<Evt> findAll();

	
	public List<Evt> findByLieu(String lieu);
	
	public List<Evt> findByDate(Date date);
	public List<Evt> findByTitre(String titre);
}