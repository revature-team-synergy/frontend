import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { remoteUrl } from '../../models/URL';
//import { addProduct } from "../../redux/slices/cartSlice";
import { Product } from "../../models/Product";
import './Products.css'
// import { AppDispatch } from '../../redux/Store';
// import { useDispatch } from 'react-redux';



const Products: React.FC = () => {
    
    //const dispatch: AppDispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const getProducts = async () => {
            const result = await axios.get(`${remoteUrl}/products`)
            setProducts(result.data.Items)
            console.log("result.entries", result.data);
        }
        getProducts()
    }, [])


    
    return (
        <div className="productContainer">
            {products.map((product) => (
                <div className="product" key="">
                    <div className="content">
                        <img src={product.imgURL} alt={product.name}/>
                    </div>
                    <div className="content">
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <span>Category: {product.category}</span>
                        <p>Price: ${product.price}</p>                       
                    </div>
                    {/* <button onClick={() => dispatch(addProduct(product))}>Add to cart</button> */}
                </div>
            ))}
        </div>
    )
}


export default Products;