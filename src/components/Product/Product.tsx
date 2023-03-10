import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { remoteUrl } from '../../models/URL';
import { addProduct } from "../../redux/slices/cartSlice";
import { IProduct } from "../../models/IProduct";
import './Product.css'
import { AppDispatch } from '../../redux/Store';
import { useDispatch } from 'react-redux';



const Products: React.FC = () => {
    
    const dispatch: AppDispatch = useDispatch();
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        const getProducts = async () => {
            const result = await axios.get(`${remoteUrl}/products`)
            setProducts(result.data.Items)
            console.log("result.entries", result.data);
        }
        getProducts()
    }, [])

    function addToCart(product: IProduct) {
        console.log("adding product:" + product.itemID)
        dispatch(addProduct(product));
    }


    
    return (
        <div className="productContainer">
            {products.map((product) => (
                <div className="productCard" key={product.itemID}>
                <div className="content">
                    <img className="img-fluid"
                    src={`${product.imgURL}`}
                    alt="logo" />
                </div>
                <div className="content">
                    <span><strong>ID:</strong> {product.itemID}</span>
                    <p className='productPrice'><strong>Name:</strong> {product.name}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <span><strong>Category:</strong> {product.category}</span>
                    <p><strong>Price:</strong> ${product.price}</p>
                </div>
                <button onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            ))}
        </div>
    )
}
    
export default Products;