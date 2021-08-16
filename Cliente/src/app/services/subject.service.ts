import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  url = 'http://localhost:4000/api/subjects/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Subject): Observable<any> {
    return this.http.post(this.url, producto);
  }

  updateProducto(producto: Subject,id:string): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}
