import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly appname = 'The Time Factory';

  constructor() { }
}
