import { Dish } from './dish.model';
// import { Timestamp } from '@google-cloud/firestore';

export interface Order {
    cart: Dish[];
    timeStamp: any;
}
