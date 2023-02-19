import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { remoteUrl } from "../../models/URL";
import { ICart } from "../../models/ICart";
import { IProduct } from "../../models/IProduct";

interface CartState {
    items: IProduct[];
}

const cart: ICart = {
    userID: "0",
    products: [],
    totalPrice: 0
};

export const checkout = createAsyncThunk(
    "checkout", 
    async (cart: ICart, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        console.log(cart);
        const res = await axios.post(`${remoteUrl}/orders`, cart, config);
        return res.data;
    } catch (e) {
        console.error(e);
        return thunkAPI.rejectWithValue('Error Checking Out Order');
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
            const productIndex = cart.products.findIndex((product) => product.itemID === itemID);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ ...action.payload, quantity: 1 });
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
    extraReducers: (builder) => {
        builder.addCase(checkout.fulfilled, (state, action) => {
            state.items = [];
            return state;
        });
    }
});

export const { addProduct, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;