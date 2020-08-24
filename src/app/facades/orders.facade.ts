import { ProductsService } from './../services/products/products.service';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class OrderFacade {

    // public orders$ = this.product.getAllOrders().pipe(
    //     map(item => item.map(a => a.cart.map(dish => dish.name)
    //         .reduce((acc, val) => acc + ', ' + val)
    //     )),
    //     shareReplay()
    // );

     public orders$ = this.product.getAllOrders().pipe(
         map(items => items.map(({ cart, timeStamp }) => {
             const orderItems = cart.map(dish => dish.name)
                 .reduce((acc, val) => acc + ', ' + ' ' + val);

             const localday = timeStamp.toDate().toLocaleDateString();
             const localtime = timeStamp.toDate().toLocaleTimeString();
             return {
                 item: orderItems,
                 day: localday,
                 time: localtime
             };
         })),
        shareReplay()
    );
    constructor(private product: ProductsService) { }
}
