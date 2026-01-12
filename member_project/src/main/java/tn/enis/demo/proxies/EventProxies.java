package tn.enis.demo.proxies;

import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.enis.demo.beans.EventBean;

@FeignClient(name = "EventService", url = "http://localhost:8086")
public interface EventProxies {
    
    @GetMapping("/events/{id}")
    EventBean getEventById(@PathVariable Long id);
    
    @GetMapping("/events")
    List<EventBean> getAllEvents();
}