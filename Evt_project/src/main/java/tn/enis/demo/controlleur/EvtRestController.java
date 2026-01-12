package tn.enis.demo.controlleur;

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
import tn.enis.demo.entities.Evt;
import tn.enis.demo.service.EvtServiceImp;



@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EvtRestController {
	EvtServiceImp imp;
	@RequestMapping(value = "/evenements", method = RequestMethod.GET)
	public List<Evt> findEvenements() {
		return imp.findAll();
	}

	@GetMapping(value = "/evenements/{id}")
	public Evt findOneEvtById(@PathVariable("id") Long id) {
		return imp.findEvt(id);
	}
	
	
	@PostMapping(value="/evenements")
	public Evt addEvt(@RequestBody Evt e)
	{
	return imp.addEvt(e);
	}
	@DeleteMapping(value="/evenements/{id}")
	public void deleteEvt(@PathVariable("id") Long id)
	{

		imp.deleteEvt(id);

	}
	@PutMapping(value="/evenements/{id}")
	public Evt updateEvt(@PathVariable("id") Long id,
	@RequestBody Evt p)
	{

	p.setId(id);
	return imp.updateEvt(p);

	}
}
