import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly appname = 'The Time Factory';
  readonly apiUrl = 'http://localhost:8080/api/';

  constructor() { }
}
