import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  URL_API = 'http://localhost:4000/api/items';

  selectedItem: Item = {
    name: '',
    price: NaN,
    size: '',
    color: '',
    electric:'',
    quantity: NaN,
    shape: '',
    space: '',
    //_id:''
  }
  
  items: Item[] = [];

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(this.URL_API);
  }

  getItem(_id: string){
    return this.http.get<Item[]>(`${this.URL_API}/${_id}`);
  }

  getItemByPrice(price: string){
    return this.http.get<Item[]>(`${this.URL_API}/price/${price}`);
  }

  createItem(item: Item){
    return this.http.post(this.URL_API, item);
  }
  
  deleteItem(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  updateItem(item: Item){
    return this.http.put(`${this.URL_API}/${item._id}`, item)
  }
  searchItem(_id: string){
    
  }
}
