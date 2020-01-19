import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  makeGetRequest(query: string) {
    return this.http.get(environment.apiUrl + query);
  }
  makePostRequest(query: string, body: any) {
    return this.http.post(environment.apiUrl + query, body);
  }
  makeDeleteRequest(query: string) {
    return this.http.delete(environment.apiUrl + query);
  }
  makePutRequest(query: string, body: any) {
    return this.http.put(environment.apiUrl + query, body);
  }
  makeGetBlobRequest(query: string): Observable<Blob> {
    return this.http.get(environment.apiUrl + query, { responseType: 'blob' });
  }
  makeGetPlainRequest(query: string) {
    return this.http.get(environment.apiUrl + query, {responseType: 'text'});
  }


}
