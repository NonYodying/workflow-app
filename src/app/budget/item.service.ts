import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateItem, EditIem, Item } from './models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly URL = 'http://localhost:3000/items';
  private httpClient = inject(HttpClient)

  constructor() { }

  list(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.URL);
  }
  
  get(id: number) {
    return this.httpClient.get<Item>(`${this.URL}/${id}`)
  }

  add(item: CreateItem) {
    return this.httpClient.post<Item>(this.URL, item);
  }
  
  edit(id: number, item: EditIem) {
    return this.httpClient.patch<Item>(`${this.URL}/${id}`, item);
  }
  
}
