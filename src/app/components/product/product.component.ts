import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();


  eidtProduct(){
    this.edit.emit(this.product);
  }

  deleteProduct(){
    this.delete.emit(this.product);
  }
  ngOnInit(){
    this.edit.emit(this.product);
  }
}
