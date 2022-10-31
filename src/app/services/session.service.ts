import { Injectable } from '@angular/core';
import { SESSION_SIGNATURE } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
  session: Map<string, string | object> = new Map();

  constructor() {
    this.readSession();
  }

  readSession() {
    const session = sessionStorage.getItem(SESSION_SIGNATURE);
    this.session = new Map(Object.entries(JSON.parse(session || "{}")))
    return session
  }

  writeSession() {
    sessionStorage.setItem(SESSION_SIGNATURE, JSON.stringify(this.session));
  }

  get(key: string) {
    return this.session.get(key);
  }

  set(key: string, value: string | object) {
    this.session.set(key, value);
    this.writeSession();
  }


}
