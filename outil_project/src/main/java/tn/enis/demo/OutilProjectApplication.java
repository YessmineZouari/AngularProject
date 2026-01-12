package tn.enis.demo;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import lombok.AllArgsConstructor;
import tn.enis.demo.entities.Outil;
import tn.enis.demo.service.OutilServiceImp;

@SpringBootApplication
@AllArgsConstructor
@EnableDiscoveryClient
public class OutilProjectApplication implements CommandLineRunner{
	OutilServiceImp imp;

	public static void main(String[] args) {
		SpringApplication.run(OutilProjectApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		Outil outil1 = Outil.builder()
		        
		        .date(new Date())
		        .source("https://example.com/tool1.pdf")
		        .build();

		Outil outil2 = Outil.builder()
		        
		        .date(new Date())
		        .source("documentation_tool.pdf")
		        .build();
		imp.addOutil(outil1);
		imp.addOutil(outil2);

	}
	

}
