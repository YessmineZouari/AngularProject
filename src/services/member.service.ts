import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) {}

  // Get all members
  GetAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/membres`);
  }

  // Add member
  addMember(member: any, type: string = 'etudiant'): Observable<Member> {
    const endpoint =
      type === 'enseignant'
        ? `${this.baseUrl}/membres/enseignant`
        : `${this.baseUrl}/membres/etudiant`;

    return this.httpClient.post<Member>(endpoint, member);
  }

  // Delete member
  deleteMemberById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/membres/${id}`);
  }

  // Get member by ID
  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/membres/${id}`);
  }

  // Update member
  updateMember(id: string, member: any): Observable<Member> {
    const isEtudiant = member.diplome || member.sujet || member.dateInscription;
    const isEnseignant = member.grade || member.etablissement;

    let endpoint: string;

    if (isEtudiant) {
      endpoint = `${this.baseUrl}/membres/etudiant/${id}`;
    } else if (isEnseignant) {
      endpoint = `${this.baseUrl}/membres/enseignant/${id}`;
    } else {
      endpoint = `${this.baseUrl}/membres/etudiant/${id}`;
    }

    return this.httpClient.put<Member>(endpoint, member);
  }

  // Get full member
  getFullMember(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/fullmember/${id}`);
  }

  // Download CV
  downloadCV(id: number): Observable<Blob> {
    return this.httpClient.get(
      `${this.baseUrl}/api/membres/${id}/cv/download`,
      { responseType: 'blob' }
    );
  }

  // Trigger browser download
  triggerCVDownload(id: number, fileName: string): void {
    this.downloadCV(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading CV:', error);
        if (error.status === 404) {
          alert('CV non disponible pour ce membre');
        } else {
          alert('Erreur lors du téléchargement du CV');
        }
      }
    });
  }

  // Upload CV
  uploadCV(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(
      `${this.baseUrl}/api/membres/${id}/upload-cv`,
      formData,
      { responseType: 'text' }
    );
  }
}
