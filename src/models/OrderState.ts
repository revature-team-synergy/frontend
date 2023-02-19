import { Cart } from "./Cart";

export interface OrderState {
    checkout: boolean;
    cart: Cart;
    addError: boolean;
    removeError: boolean;
    isLoading: boolean;   
}