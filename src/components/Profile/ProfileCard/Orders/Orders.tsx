import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {remoteUrl} from '../../../../models/URL';
import { Order } from "../../../../models/Order";
import { IProduct } from "../../../../models/IProduct";
import "./Orders.css";

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            const token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`},
            };
            const result = await axios.get(`${remoteUrl}/orders/`, config)
            setOrders(result.data)
        }
        getOrders()

    }, [])

    function showAllOrders(orders: Order[]) {
        return orders.map((order: Order) => {
            return (
                <div id="orderCard" key={order.orderID}>
                    {order.products.map((product: IProduct) => {
                        return (
                            <div key={product.itemID}>
                                <h6>{product.quantity} {product.name}</h6>
                            </div>
                        )
                    })}
                    <div id="orderPrice">${order.totalPrice.toFixed(2)}</div>
                </div>
            )
        })
    }

    return (
        <div className="productContainer">
            {showAllOrders(orders)}
        </div>
    )
}

export default Orders;