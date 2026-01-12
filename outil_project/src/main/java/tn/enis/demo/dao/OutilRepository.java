package tn.enis.demo.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tn.enis.demo.entities.Outil;




public interface OutilRepository extends JpaRepository<Outil, Long> {
	public List<Outil> findByDate(Date date);
	public List<Outil> findBySource(String source);

	

}
