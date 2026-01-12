package tn.enis.demo.entities;

import java.io.Serializable;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembreEvtId implements Serializable {
    private Long event_id;
    private Long membre_id;
}