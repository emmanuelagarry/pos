import {  combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { Dish } from '../models/dish.model';

@Injectable()
export class ProductFacade {


    private product$ = this.product.getAllProducts().pipe(map(items => items.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
            return { id, ...data };
        })), shareReplay());


    private category$ = this.product.getAllCategory().pipe(map(items => items.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
            return { id, ...data };
        })), shareReplay());


    private dish$ = this.product.getAllDish().pipe(map(items => items.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
            return { id, ...data };
        })), shareReplay());


    productWithCategory$ = combineLatest([this.category$, this.product$, this.dish$])
        .pipe(map(([category, food, dish]) => ({category, food, dish})));


    constructor(private product: ProductsService) {

    }



    addNewCategory(category: Category) {
        this.product.addcategory(category);
    }

    addNewproduct(product: Product) {
        this.product.addProducts(product);
    }


    // Deletes food
    deleteProduct(foodId, foodName: string) {
        if (this.product.arraycontains(foodName)) {
            alert('A dish with that current items exist. Delete that dish first');
        } else {
            this.product.deleteProduct(foodId);
        }
    }

    addNewDish(dish: Dish) {
        this.product.addDish(dish);
    }

    // Adds new food
    deleteDish(id: string) {
        this.product.deleteDish(id);
    }



}
