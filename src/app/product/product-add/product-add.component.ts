import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Product } from '../../structures/product.model'
import {ProductDataService} from '../product-data.service'
import { EMPTY} from 'rxjs'
import {catchError} from 'rxjs/operators'

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit{
  public addProductForm: FormGroup
  public confirmationMessage: string = ''
  public errorMessage: string = ''

  constructor(private _productDataService: ProductDataService, private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmit()
  {
    this._productDataService.addNewProduct(new Product(
      1,
      this.addProductForm.value.productName,
      this.addProductForm.value.image,
      this.addProductForm.value.price,
      this.addProductForm.value.description
    )).pipe(
      catchError((err) => {
        this.errorMessage = err
        return EMPTY
      })
    ).subscribe((pro: Product) => {
      this.confirmationMessage = `a product was succesfully added`
    })
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
}
