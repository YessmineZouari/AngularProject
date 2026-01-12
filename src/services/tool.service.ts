import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Outil } from 'src/models/Outil';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) { }

  // ✅ Get all tools
  getAllTool(): Observable<Outil[]> {
    return this.httpClient.get<Outil[]>("http://localhost:8083/outils");
  }

  // ✅ Add a tool
  addTool(data: Outil): Observable<void> {
    return this.httpClient.post<void>("http://localhost:8083/outils", data);
  }

  // ✅ Update a tool
  updateTool(id: string, data: Outil): Observable<Outil> {
    return this.httpClient.put<Outil>(`http://localhost:8083/outils/${id}`, data);
  }

  // ✅ Get tool by ID
  getToolByID(id: string): Observable<Outil> {
    return this.httpClient.get<Outil>(`http://localhost:8083/outils/${id}`);
  }
}
