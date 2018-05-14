import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private _http: HttpClient) { }

  getRequest(question, session_id ) {
    return this._http.get("/api/pokedex?question="+question+"&session_id="+session_id);
  }
}
