import { IProduct } from "./IProduct";

export interface ICart {
    userID: string
    products: IProduct[];
    totalPrice: number;
}
