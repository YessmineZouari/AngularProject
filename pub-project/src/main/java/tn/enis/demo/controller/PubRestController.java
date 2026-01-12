package tn.enis.demo.controller;

import java.util.List;

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
import tn.enis.demo.entities.Publication;
import tn.enis.demo.service.PubServiceImp;



@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PubRestController {
	PubServiceImp pubServiceImp;
	@RequestMapping(value = "/publications", method = RequestMethod.GET)
	public List<Publication> findPublications() {
		return pubServiceImp.findAll();
	}

	@GetMapping(value = "/publications/{id}")
	public Publication findOnePubById(@PathVariable("id") Long id) {
		return pubServiceImp.findPublication(id);
	}
	
	
	@PostMapping(value="/publications")
	public Publication addPub(@RequestBody Publication p)
	{
	return pubServiceImp.addPublication(p);
	}
	@DeleteMapping(value="/publications/{id}")
	public void deletePub(@PathVariable("id") Long id)
	{

		pubServiceImp.deletePublication(id);

	}
	@PutMapping(value="/publications/{id}")
	public Publication updatePub(@PathVariable("id") Long id,
	@RequestBody Publication p)
	{

	p.setId(id);
	return pubServiceImp.updatePublication(p);

	}
	
}
