import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;