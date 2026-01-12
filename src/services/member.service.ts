import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = 'http://localhost:8082/api/membres';

  constructor(private httpClient: HttpClient) {}

  // --- CRUD Operations ---

  GetAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl);
  }

  addMember(member: any, type: string = 'etudiant'): Observable<Member> {
    const endpoint =
      type === 'enseignant'
        ? `${this.baseUrl}/enseignant`
        : `${this.baseUrl}/etudiant`;
    return this.httpClient.post<Member>(endpoint, member);
  }

  deleteMemberById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  getMemberByID(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/${id}`);
  }

  updateMember(id: string, member: any): Observable<Member> {
    const isEtudiant = member.diplome || member.sujet || member.dateInscription;
    const isEnseignant = member.grade || member.etablissement;

    let endpoint: string;
    if (isEtudiant) {
      endpoint = `${this.baseUrl}/etudiant/${id}`;
    } else if (isEnseignant) {
      endpoint = `${this.baseUrl}/enseignant/${id}`;
    } else {
      endpoint = `${this.baseUrl}/etudiant/${id}`;
    }

    return this.httpClient.put<Member>(endpoint, member);
  }

  getFullMember(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`http://localhost:8082/api/fullmember/${id}`);
  }

  // --- CV Download ---

  /**
   * Downloads CV as a blob and exposes headers
   */
  downloadCV(id: number): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(`${this.baseUrl}/${id}/cv/download`, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  /**
   * Triggers browser download from the blob
   */
  triggerCVDownload(id: number): void {
    this.downloadCV(id).subscribe({
      next: (res) => {
        const blob = res.body!;
        const contentDisposition = res.headers.get('Content-Disposition');
        let fileName = 'cv.pdf'; // default

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+)"?/);
          if (match && match[1]) {
            fileName = match[1];
          }
        }

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

  // --- CV Upload ---

  uploadCV(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.baseUrl}/${id}/upload-cv`, formData, {
      responseType: 'text'
    });
  }
}
