import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {remoteUrl} from '../../../../models/URL';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState([]);

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

    function showAllOrders(orders: any) {
        return orders.map((item: any, index: any) => {
            return (
                <div>
                    <h4>{`Order ${index + 1}`}</h4>
                    {item.products.map((item: any) => {
                        return (
                            <div>
                                <h6>{item.name}</h6>
                            </div>
                        )
                    })}
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