import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private httpClient:HttpClient) {}

  GetAllMembers():Observable<Member[]>{
    return this.httpClient.get<Member[]>("http://localhost:8082/membres");
  }
  
  addMember(member: any, type: string = 'etudiant'): Observable<Member> {
    const endpoint = type === 'enseignant' 
      ? "http://localhost:8082/membres/enseignant"
      : "http://localhost:8082/membres/etudiant";
    return this.httpClient.post<Member>(endpoint, member);
  }
  
  deleteMemberById(id:String): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8082/membres/${id}`);
  }
  
  getMemberByID(id:String): Observable<Member>{
    return this.httpClient.get<Member>(`http://localhost:8082/membres/${id}`);
  }
  
  updateMember(id: string, member: any): Observable<Member>{
    // Detect member type based on fields
    // If has 'diplome' or 'sujet' or 'dateInscription' -> Etudiant
    // If has 'grade' or 'etablissement' -> EnseignantChercheur
    const isEtudiant = member.diplome || member.sujet || member.dateInscription;
    const isEnseignant = member.grade || member.etablissement;
    
    let endpoint: string;
    if (isEtudiant) {
      endpoint = `http://localhost:8082/membres/etudiant/${id}`;
    } else if (isEnseignant) {
      endpoint = `http://localhost:8082/membres/enseignant/${id}`;
    } else {
      // Default: try etudiant endpoint
      endpoint = `http://localhost:8082/membres/etudiant/${id}`;
    }
    
    return this.httpClient.put<Member>(endpoint, member);
  }
  getFullMember(id: string): Observable<Member> {
  return this.httpClient.get<Member>(`http://localhost:8082/fullmember/${id}`);
}
}