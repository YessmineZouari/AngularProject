package tn.enis.demo.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tn.enis.demo.entities.Evt;


public interface EvtRepository extends JpaRepository<Evt, Long> {
	public List<Evt> findByDate(Date  date);
	public List<Evt> findByLieu(String lieu);
	public List<Evt> findByTitre(String titre);
}