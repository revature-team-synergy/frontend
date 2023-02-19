import { IProduct } from "./IProduct";

export interface ICart {
    id: string
    order: IProduct[];
    total: number;
    checkout: boolean;
}
