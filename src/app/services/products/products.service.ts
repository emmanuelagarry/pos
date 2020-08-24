import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core'
import { ErrorFacade } from 'src/app/facades/error.facade'
import { Product } from 'src/app/models/product.model'
import { Category } from 'src/app/models/category.model'
import { Dish } from 'src/app/models/dish.model'
import { Order } from 'src/app/models/orders.model'
import { AngularFireStorage } from '@angular/fire/storage'

@Injectable()
export class ProductsService {
  constructor(
    private afs: AngularFirestore,
    private errorFacade: ErrorFacade,
    private storage: AngularFireStorage
  ) {}

  // Get all food
  getAllProducts() {
    return this.afs.collection<Product>('products').snapshotChanges()
  }

  // Add a new food item
  addProducts(product: Product) {
    this.afs
      .collection('products')
      .doc(product.name)
      .set(product)
      .catch(e => {
        this.errorFacade.passError(e)
      })
  }

  // Delete food item
  deleteProduct(productId: string) {
    this.afs
      .collection('dish')
      .doc(productId)
      .delete()
  }

  // GetAll food category
  getAllCategory() {
    return this.afs.collection<Category>('category').snapshotChanges()
  }

  // Add new food category
  addcategory(category: Category) {
    // this.afs.collection('category').doc(category.category).set(category).catch(e => {
    //   this.errorFacade.passError(e);
    // });
  }

  // Get All Dishes
  getAllDish() {
    return this.afs.collection<Dish>('dish').snapshotChanges()
  }

  getAllOrders() {
    return this.afs.collection<Order>('checkout').valueChanges()
  }

  // Add new Dish
  addDish(dish: Dish) {
    this.afs
      .collection('dish')
      .doc(dish.name)
      .set(dish)
      .catch(e => {
        this.errorFacade.passError(e)
      })
  }

  // Delete dish item
  deleteDish(dishId: string) {
    this.afs
      .collection('dish')
      .doc(dishId)
      .delete()
  }

  async arraycontains(foodName: string) {
    try {
      const item = await this.afs
        .collection('dish', ref =>
          ref.where('combo', 'array-contains', foodName)
        )
        .get()
        .toPromise()
      if (item) {
        return true
      } else {
        return false
      }
    } catch (e) {
      this.errorFacade.passError(e)
    }
  }

  decrementCount(checkOutItems: Dish[]) {
    return this.afs
      .collection('checkout')
      .add({
        cart: checkOutItems,
        // time: new Date().getTime(),
        // month: new Date().getMonth()
      })
      .catch(e => this.errorFacade.passError(e))
  }

  uploadRef(path: string) {
    return this.storage.ref(path)
  }
  upload(path: string, file: File, customMetadata: {}) {
    return this.storage.upload(path, file, { customMetadata })
  }
}
