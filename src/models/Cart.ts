import { Product } from "./Product";

export interface Cart {
    id: string
    order: Product[];
    total: number;
}
