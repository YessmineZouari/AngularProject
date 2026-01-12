package tn.enis.demo;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import lombok.AllArgsConstructor;
import tn.enis.demo.entities.Evt;
import tn.enis.demo.service.EvtServiceImp;



@SpringBootApplication
@AllArgsConstructor
@EnableDiscoveryClient
public class EvtProjectApplication implements CommandLineRunner{
	EvtServiceImp imp;

	public static void main(String[] args) {
		SpringApplication.run(EvtProjectApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		Evt event1 =
				Evt .builder()
			        .titre("AI & Software Engineering Workshop")
			        .date(new Date())
			        .lieu("ENIS - Amphithéâtre Principal")
			        .build();

		Evt  event2 =
				Evt .builder()
			        .titre("Cloud Computing Conference")
			        .date(new Date())
			        .lieu("Tunis – Palais des Congrès")
			        .build();

		Evt  event3 =
				Evt .builder()
			        .titre("Microservices & DevOps Meetup")
			        .date(new Date())
			        .lieu("Sfax Innovation Center")
			        .build();
		imp.addEvt(event1);
		imp.addEvt(event2);
		imp.addEvt(event3);
		
		
	}
}
