import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(private productService: ProductsService){}

products: Product[] = [];
totalRecords: number = 0;
rows: number = 5;

displayEditPopup: boolean = false;
displayAddPopup: boolean = false;

selectedProduct: Product = {
  id: 0,
  name: '',
  image: '',
  price: '',
  rating: 0,
};

toggleEditPopup(product: Product){
  this.selectedProduct = product;
  this.displayEditPopup = true;
}

toggleAddPopup() {
  this.displayAddPopup = true;
}

toggleDeletePopup(product: Product){
  this.selectedProduct = product;
  this.displayEditPopup = true;
}

onConfirmEdit(product: Product){
  this.eidtProduct(product, this.selectedProduct.id ?? 0)
  this.displayEditPopup = false;
}

onConfirmAdd(product: Product){
  this.addProduct(product)
  this.displayAddPopup = false;
}


OnProductOutput(product: Product){
  console.log(product, 'OutPut');
}

onPageChange(event: any){
  this.fetchProducts(event.page, event.rows);
}

fetchProducts(page: number, perPage: number){
  this.productService.getProducts('http://localhost:3000/clothes', {
    page, perPage
  }).subscribe(
    {
      next: (data: Products) => {
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error) => {
        console.log(error);
      } 
    }
  );
}

eidtProduct(product: Product, id: number){
  this.productService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
    {
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      }
    }
  )
console.log(product, 'Edit');
}

deleteProduct(id: number){
  this.productService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe(
    {
    next: (data) => {
      console.log(data);
      this.fetchProducts(0, this.rows);
    },
    error: (error) =>{
      console.log(error);
    }
  }
  )}

addProduct(product: Product){
  this.productService.addProduct(`http://localhost:3000/clothes`, product).subscribe({
    next: (data) => {
      console.log(data);
      this.fetchProducts(0, this.rows)
    },
    error: (error) => {
      console.log(error);
    }
  })
console.log(product, 'add')
}

ngOnInit(){
this.fetchProducts(0, this.rows);
}
}
