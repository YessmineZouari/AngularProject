package tn.enis.demo;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import lombok.AllArgsConstructor;
import tn.enis.demo.entities.Publication;
import tn.enis.demo.service.PubServiceImp;

@SpringBootApplication
@AllArgsConstructor
@EnableDiscoveryClient
public class PubProjectApplication implements CommandLineRunner {
	PubServiceImp imp;

	public static void main(String[] args) {
		SpringApplication.run(PubProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Publication pubs1 = Publication.builder().type("article").titre("an approach for testing soa systems")
				.date(new Date()).lieu("lien").sourcePdf("pdf").build();
		Publication pubs2 = Publication.builder().type("conference")
				.titre("a deep learning model for real-time image classification").date(new Date())
				.lieu("https://example.com/publication2").sourcePdf("classification_model.pdf").build();
		Publication pubs3 = Publication.builder().type("journal")
				.titre("improving microservices performance through adaptive caching").date(new Date())
				.lieu("https://example.com/publication3").sourcePdf("microservices_caching.pdf").build();
		imp.addPublication(pubs3);
		imp.addPublication(pubs1);
		imp.addPublication(pubs2);
		

	}

}
