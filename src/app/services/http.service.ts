import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConstantsService} from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private constants: ConstantsService) {}

  makeGetRequest(query: string) {
    console.log(this.http.get(this.constants.apiUrl + query));
    return this.http.get(this.constants.apiUrl + query);
  }
  makePostRequest(query: string, body: any) {
    return this.http.post(this.constants.apiUrl + query, body);
  }
      makeDeleteRequest(query: string) {
    return this.http.delete(this.constants.apiUrl + query);
  }
  makePutRequest(query: string, body: any) {
    return this.http.put(this.constants.apiUrl + query, body);
  }
  makeGetBlobRequest(query: string): Observable<Blob> {
    return this.http.get(this.constants.apiUrl + query, { responseType: 'blob' });
  }
  makeGetPlainRequest(query: string) {
    return this.http.get(this.constants.apiUrl + query, {responseType: 'text'});
  }


}
