package tn.enis.demo.service;

import java.util.Date;
import java.util.List;

import tn.enis.demo.entities.Outil;

public interface IOutilService {

	public Outil addOutil(Outil o);

	public void deleteOutil(Long id);

	public Outil updateOutil(Outil o);

	public Outil findOutil(Long id);

	public List<Outil> findAll();

	public List<Outil> findBySource(String source);

	public List<Outil> findByDate(Date date);
}
