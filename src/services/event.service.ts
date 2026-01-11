import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {



  constructor(private httpClient: HttpClient) { }

  // ✅ Méthode correcte
  getAllEvent(): Observable<Evt[]> {
   return this.httpClient.get<Evt[]>("http://localhost:8081/evenements");


  }
addEvent(data: Evt): Observable<void> {
  return this.httpClient.post<void>("http://localhost:8081/evenements", data);
}
updateEvent(id: string, data: Evt): Observable<Evt> {
  return this.httpClient.put<Evt>(`http://localhost:8081/evenements/${id}`, data);
}
 getEventByID(id: string): Observable<Evt> {
    return this.httpClient.get<Evt>(`http://localhost:8081/evenements/${id}`);
  }


}
