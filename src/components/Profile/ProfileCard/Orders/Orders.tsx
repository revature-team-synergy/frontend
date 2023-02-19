import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ICart } from '../../../../models/ICart';
import { IProduct } from '../../../../models/IProduct';
import { remoteUrl } from '../../../../models/URL';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<IProduct[]>([]);
    useEffect(() => {
        const getOrders = async () => {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const result = await axios.get(`${remoteUrl}/orders/`, config)
            setOrders(result.data.Items)
            console.log("result.entries", result.data);
        }
        getOrders()
        console.log(orders)
        orders.forEach((item) => (console.log(item)))
    }, [])

    

    return (
        <div className="productContainer">

        </div>
    )
}

export default Orders;