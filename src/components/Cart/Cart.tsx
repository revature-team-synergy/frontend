import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICart } from '../../models/ICart';
import { IProduct } from '../../models/IProduct';
import { removeProduct } from '../../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../../redux/Store';
import Navbar from "../Navbar/Navbar";
import '../Product/Product'


const Cart: React.FC = () => {
    const allProducts: ICart = useSelector((state: RootState) => state.cart);
    const dispatch: AppDispatch = useDispatch();

    function removeFromCart(product: IProduct) {
        console.log("removing product:" + product.id)
        dispatch(removeProduct(product));
    }

    const cart = allProducts.order.map((product) => (
            <div className="productContainer">
                <div className="productCard" key={product.id}>
                    <div className="content">
                        <img className="img-fluid" 
                            src={`${product.imgURL}`} 
                            alt={product.name}/>
                    </div>
                    <div className="content">
                        <p className='productPrice'>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <span>Category: {product.category}</span>
                        <p>Price: ${product.price}</p>                       
                    </div>
                    <button onClick={() => removeFromCart(product)}>Remove from cart</button>
                </div>
            </div>
        ))
    
        return (
        <div id="cartContainer">
            <Navbar />
            <h3>Total: $ {Math.round((allProducts.total + Number.EPSILON) * 100) / 100} </h3>
            <button>Checkout</button>
            {cart}
        </div>
    );
}

export default Cart;