import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ProfessionalData, ResponseProfessionalData } from '../models/professional-data.model'

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  public url: string
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl
  }

  getProfessionals(): Observable<ProfessionalData[]> {
    return this.http
      .get<{ professionals: ProfessionalData[] }>(
        this.url + 'project/professionals',
        {
          headers: this.headers
        }
      )
      .pipe(map((response) => response.professionals))
  }

  saveProfessional(
    professional: ProfessionalData
  ): Observable<ResponseProfessionalData> {
    let params = JSON.stringify(professional)
    return this.http.post<ResponseProfessionalData>(
      this.url + 'project/create-professional',
      params,
      {
        headers: this.headers
      }
    )
  }
}
