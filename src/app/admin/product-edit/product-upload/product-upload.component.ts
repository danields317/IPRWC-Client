import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {
  private productForm: FormGroup;

  constructor(private productService: ProductService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.productForm = new FormGroup({
      thumbnail: new FormControl(null, [Validators.required]),
      productName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+\.?[0-9]*$/)]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      category: new FormControl(null, Validators.required)
    });
  }

  uploadProduct() {
    this.productService.uploadProject(this.productFormToFormData()).subscribe(
      data => this.handleSuccess(),
      error => this.handleFail()
    );
  }

  handleSuccess() {
    this.productForm.reset();
  }

  handleFail() {
    console.log('fail');
  }

  productFormToFormData() {
    const formData: any = new FormData();
    formData.append('thumbnail', this.productForm.get('thumbnail').value);
    formData.append('productName', this.productForm.get('productName').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('brand', this.productForm.get('brand').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('stock', this.productForm.get('stock').value);
    formData.append('category', this.productForm.get('category').value);
    return formData;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('thumbnail').setValue(file);
    }
  }
}
