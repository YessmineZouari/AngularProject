package tn.enis.demo.controller;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import tn.enis.demo.entities.Outil;
import tn.enis.demo.service.IOutilService;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OutilRestController {
	IOutilService service;

	@RequestMapping(value = "/outils", method = RequestMethod.GET)
	public List<Outil> findOutils() {
		return service.findAll();
	}

	@GetMapping(value = "/outils/{id}")
	public Outil findOneOutilById(@PathVariable("id") Long id) {
		return service.findOutil(id);
	}
	@PostMapping(value="/outils")
	public Outil addOutil(@RequestBody Outil o)
	{
	return service.addOutil(o);
	}
	
	@DeleteMapping(value="/outils/{id}")
	public void deleteOutil(@PathVariable("id") Long id)
	{

	service.deleteOutil(id);

	}
	@PutMapping(value="/outils/{id}")
	public Outil updatemembre(@PathVariable("id") Long id,
	@RequestBody Outil o)
	{

	o.setId(id);
	return service.addOutil(o);

	}
	
}
