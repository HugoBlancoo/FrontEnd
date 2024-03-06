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
      },
      err=> console.error(err)
    )
  }

  addItem(form: NgForm) {
    if (form.value._id) {
      this.itemService.updateItem(form.value).subscribe(
        (res) => {
          console.log(res);
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
