import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductList} from '../../models/productList';
import {Product} from '../../models/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  type = 'all';
  pageSize = 5;
  page = 1;
  maxPages: number;
  productList: Product[];
  shownProduct: Product;
  shownProductImg;
  isLoading = false;
  productForm: FormGroup;

  constructor(private productService: ProductService) {
    this.getProducts();
    this.createForm();
  }

  ngOnInit() {
  }

  getProducts() {
    this.productService.getProducts(this.type, this.pageSize, this.page).subscribe(
      (data: ProductList) => this.manageResponse(data)
    );
  }

  manageResponse(data: ProductList) {
    this.maxPages = data.totalPages;
    this.productList = data.products;
  }

  showProduct(product: Product) {
    this.shownProduct = product;
    this.productForm.patchValue({
      id: product.id,
      productName: product.productName,
      description: product.description,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
    this.isLoading = true;
    this.productService.getProductThumbnail(this.shownProduct.id).subscribe(
      data => this.createImageFromBlob(data),
      error => this.handleNoImage()
    );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        this.handleImage(reader.result);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  handleImage(image) {
    this.shownProductImg = image;
    this.isLoading = false;
  }

  handleNoImage() {
    this.shownProduct.thumbnail = '../../../assets/img/600px-No_image_available.svg.png';
    this.isLoading = false;
  }

  swapPage(amount: number) {
    this.page = this.page + amount;
    this.getProducts();
  }

  updateProduct() {
    this.productService.updateProduct(this.productFormToFormData()).subscribe(
      data => this.handleUpdate(true),
      error => console.log('paal')
    );
  }

  handleUpdate(removeShown: boolean) {
    if (removeShown === true) {
      this.shownProduct = null;
    }
    this.resetImgInput();
    this.getProducts();
  }

  createForm() {
    this.productForm = new FormGroup({
      thumbnail: new FormControl(),
      productName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+\.?[0-9]*$/)]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      category: new FormControl(null, Validators.required)
    });
  }

  productFormToFormData() {
    const formData: any = new FormData();
    formData.append('thumbnail', this.productForm.get('thumbnail').value);
    formData.append('id', this.shownProduct.id);
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

  deleteProduct() {
    this.productService.deleteProduct(this.shownProduct.id).subscribe(
      data => this.handleUpdate(true),
      error => console.log('fool')
    );
  }

  resetImgInput() {
    this.productForm.get('thumbnail').reset();
  }
}
