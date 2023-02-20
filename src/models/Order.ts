import { IProduct } from "./IProduct";

export interface Order {
    orderID: string;
    userID: string;
    products: IProduct[];
    totalPrice: number;
}