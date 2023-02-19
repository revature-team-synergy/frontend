import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICart } from "../../models/ICart";
import { IProduct } from "../../models/IProduct";
import { checkout, decreaseQuantity } from "../../redux/slices/cartSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import Navbar from "../Navbar/Navbar";

const Cart: React.FC = () => {
    const cartItems: IProduct[] = useSelector((state: RootState) => state.cart.items);
    const userState = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    const [fullCart, setFullCart] = useState<ICart>({
        userID: "0",
        products: cartItems,
        totalPrice: 0
    });

    const decreaseQuantityHandler = (itemID: string) => {
        dispatch(decreaseQuantity(itemID));
    };

    const checkoutHandler = () => {
        dispatch(checkout(fullCart));
    };

    useEffect(() => {
        if (!userState.isLoggedIn) navigate('/');
        const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setFullCart({userID: "0", products: cartItems, totalPrice: totalCartPrice})
    }, [userState.isLoggedIn, cartItems]);

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
            <button onClick={checkoutHandler}>Checkout</button>
            {cart}
        </div>
    );
};

export default Cart;