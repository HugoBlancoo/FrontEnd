import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'
import { NgForm } from '@angular/forms'
import { Item } from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{


  constructor(public itemService: ItemService) {}
  
  filterById: string = '';
  filterByPrice: string = '';
  filteredItems: Item[] = [];

  ngOnInit(): void {
    this.getItems();
  }

  resetForm(form: NgForm){
    form.reset();
  }


  getItems() {
    this.itemService.getItems().subscribe(
      res => {
        this.itemService.items = res;
        this.filteredItems = [...this.itemService.items]
      },
      err=> console.error(err)
    )
  }

  getItem(_id: string) {
    this.itemService.getItem(_id).subscribe(
      (res) => {//NO DEJABA TENER RES ENTRE CORCHETES PORQUE TYPSCRIPT NO SE FIA Y ENTONCES O HACES UN IF QUE LO COMRPUEBE O NO DEJA OS LO DEJO AQUI ANOTADO BABY GRU GRU
        
        if (Array.isArray(res)) {
          // If res is an array, assign it directly to filteredItems
          this.filteredItems = res;
        } else {
          // If res is a single item, wrap it in an array
          this.filteredItems = [res];
        }
        console.log(this.filteredItems);
      },
      (err) => console.error(err)
    );
  }
  
  getItemByPrice(price: string){
    this.itemService.getItemByPrice(price).subscribe(
      (res) => {//NO DEJABA TENER RES ENTRE CORCHETES PORQUE TYPSCRIPT NO SE FIA Y ENTONCES O HACES UN IF QUE LO COMRPUEBE O NO DEJA OS LO DEJO AQUI ANOTADO BABY GRU GRU
        
        if (Array.isArray(res)) {
          // If res is an array, assign it directly to filteredItems
          this.filteredItems = res;
        } else {
          // If res is a single item, wrap it in an array
          this.filteredItems = [res];
        }
        console.log(this.filteredItems);
      },
      (err) => console.error(err)
    );
  }

  addItem(form: NgForm) {
    if (form.value._id) {
      this.itemService.updateItem(form.value).subscribe(
        (res) => {
          //console.log(res);
          this.getItems();
          form.reset();
          alert("Modificado con Éxito");
        },
        (err) => console.error(err),
      );
    } else{
      this.itemService.createItem(form.value).subscribe(
        (res) => {
          this.getItems();
          form.reset();
          alert("Creado con Éxito");
        },
        (err) => console.error(err)
      );
    }
  }
  deleteItem( _id: string){
      this.itemService.deleteItem(_id).subscribe(
          (res) => {
            this.getItems();
            alert("Borrado con Éxito");
          },
          (err) =>console.error(err)
          
        );
  }

  updateItem( item: Item){
    this.itemService.selectedItem = item;
    
  }

}
