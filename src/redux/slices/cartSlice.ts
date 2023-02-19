import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { remoteUrl } from "../../models/URL";
import { ICart } from "../../models/ICart";
import { IProduct } from "../../models/IProduct";

const cart: ICart = {
    id: "0",
    order: [],
    total: 0,
    checkout: false
}

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
    initialState: cart,
    reducers: {
        setCart: (state, action) => {
            state.order = action.payload;
            return state;
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.total += action.payload.price
            state.order.push(action.payload); 
            return state;
        },
        removeProduct: (state, action: PayloadAction<IProduct>) => {
            state.total -= action.payload.price
            const index = state.order.indexOf(action.payload)
            state.order.splice(index, 1);
            return state;
        },
        checkout: (state) => {
            // Need to update database
            state.checkout = true;
            return state;
        }
        
    }
});





export const { setCart, addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
