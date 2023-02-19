import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../models/IProduct";
import { decreaseQuantity } from "../../redux/slices/cartSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import Navbar from "../Navbar/Navbar";

const Cart: React.FC = () => {
    const cartItems: IProduct[] = useSelector((state: RootState) => state.cart.items);
    const dispatch: AppDispatch = useDispatch();

    const decreaseQuantityHandler = (itemID: string) => {
        dispatch(decreaseQuantity(itemID));
    };

    const cart = cartItems.map((product: IProduct) => (
        <div className="productContainer" key={product.itemID}>
            <div className="productCard">
                <div className="content">
                    <img className="img-fluid" src={product.imgURL} alt={product.name} />
                </div>
                <div className="content">
                    <p className="productPrice">Name: {product.name}</p>
                    <p>Description: {product.description}</p>
                    <span>Category: {product.category}</span>
                    <span>Quantity: {product.quantity}</span>
                    <p>Price: ${product.price * product.quantity}</p>
                </div>
                <button onClick={() => decreaseQuantityHandler(product.itemID)}>Remove Item</button>
            </div>
        </div>
    ));

    return (
        <div id="cartContainer">
            <Navbar />
            <button>Checkout</button>
            {cart}
        </div>
    );
};

export default Cart;