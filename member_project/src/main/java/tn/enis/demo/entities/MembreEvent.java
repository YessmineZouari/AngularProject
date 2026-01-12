package tn.enis.demo.entities;

import java.util.Date;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembreEvent {
    
    @EmbeddedId
    private MembreEvtId id;
    
    @ManyToOne
    @MapsId("membre_id")
    private Member membre;
    
    @Temporal(TemporalType.DATE)
    private Date dateParticipation;
    
   
}