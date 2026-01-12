package tn.enis.demo.proxies;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import tn.enis.demo.beans.PublicationBean;

@FeignClient(name = "PUB-PROJECT" , url = "http://localhost:8084")
public interface PublicationsProxies {
	@GetMapping("/publications/{id}")
	public PublicationBean getPublicationById(@PathVariable(name="id") long id);

}
