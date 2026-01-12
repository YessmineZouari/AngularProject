package tn.enis.demo.beans;

import java.util.Date;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
public class EventBean {
    private Long id;
    
    private String titre;
    
    @Temporal(TemporalType.DATE)
    private Date date;
    
    private String lieu;
    
    
}