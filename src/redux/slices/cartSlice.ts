import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderState } from "../../models/OrderState";
import { remoteUrl } from "../../models/URL";
import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";

const cart: Cart = {
    id: "0",
    order: [],
    total: 0
}

const initialState: OrderState = {
    checkout: false,
    cart,
    addError: false,
    removeError: false,
    isLoading: false
};

export const checkout = createAsyncThunk(
    'checkout',
    async () => {
        console.log("Checked Out");
        try{    
            const res = await axios.post(`${remoteUrl}/checkout`, cart);
            localStorage.removeItem("cart");
            return res;
        } catch(e) {
           console.error(e);
        }
    }

);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
            return state;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.cart.order.push(action.payload); 
        },
        
    },
    extraReducers: (builder) => {

        // Checkout Cases
        builder.addCase(checkout.fulfilled, (state) => {
            state.checkout = true;
            state.isLoading = false;
            return state;
        });
    }
});





export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
