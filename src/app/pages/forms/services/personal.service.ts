import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { PersonalData, ResponsePersonalData } from '../models/personal-data.model'

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  public url: string
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl
  }

  getPersonal(): Observable<PersonalData[]> {
    return this.http.get<{ personal: PersonalData[] }>(this.url + 'project/personal', {
      headers: this.headers
    }).pipe(
      map(response => response.personal)
    );
  }

  savePersonal(personalData: PersonalData): Observable<ResponsePersonalData> {
    let params = JSON.stringify(personalData)
    return this.http.post<ResponsePersonalData>(this.url + 'project/create-personal', params, {
      headers: this.headers
    })
  }
}
