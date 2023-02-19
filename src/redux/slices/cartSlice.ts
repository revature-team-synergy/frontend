import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { remoteUrl } from "../../models/URL";
import { ICart } from "../../models/ICart";
import { IProduct } from "../../models/IProduct";

interface CartState {
    items: IProduct[];
}

const cart: ICart = {
    id: "0",
    order: [],
    total: 0,
    checkout: false,
};

export const checkout = createAsyncThunk("checkout", async () => {
    console.log("Checked Out");
    try {
        const res = await axios.post(`${remoteUrl}/checkout`, cart);
        localStorage.removeItem("cart");
        return res;
    } catch (e) {
        console.error(e);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [] } as CartState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const { itemID } = action.payload;
            const existingItem = state.items.find((item) => item.itemID === itemID);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            const productIndex = cart.order.findIndex((product) => product.itemID === itemID);
            if (productIndex !== -1) {
                cart.order[productIndex].quantity++;
            } else {
                cart.order.push({ ...action.payload, quantity: 1 });
            }
            console.log(cart);
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const itemID = action.payload;
            const existingItemIndex = state.items.findIndex((item) => item.itemID === itemID);
            if (existingItemIndex !== -1) {
                if (state.items[existingItemIndex].quantity > 1) {
                    state.items[existingItemIndex].quantity--;
                } else {
                    state.items.splice(existingItemIndex, 1);
                }
            }
        },
    },
});

export const { addProduct, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;