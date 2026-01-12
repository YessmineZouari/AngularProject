package tn.enis.demo.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.enis.demo.entities.MembreEvtId;
import tn.enis.demo.entities.MembreEvent;

public interface MembreEvtRepository extends JpaRepository<MembreEvent, MembreEvtId> {
    
    // Find all events for a specific member
    @Query("select m from MembreEvent m where m.id.membre_id=:x")
    List<MembreEvent> findEventsByMembreId(@Param("x") Long membreId);
    
    // Find all members for a specific event
    @Query("select m from MembreEvent m where m.id.event_id=:x")
    List<MembreEvent> findMembersByEventId(@Param("x") Long eventId);
}