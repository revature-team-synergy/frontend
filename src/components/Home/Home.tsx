import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../redux/slices/userSlice";
import {AppDispatch, RootState} from "../../redux/Store";
import Navbar from "../Navbar/Navbar";
import Product from "../Product/Product";
import './Home.css'
import axios from 'axios'


export const Home: React.FC = () => {

    const userState = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const [products, setProducts] = useState<{
        imageURL: string,
        name: string,
        price: number,
        description: string,
        category: string
    }[]>([]);


    useEffect(() => {
        if (!userState.isLoggedIn) navigate('/');
    }, [userState.isLoggedIn]);

    useEffect(()=>{
        retrieveProducts()
    }, [])

    async function retrieveProducts() {
        const response = await axios.get(`https://25c298c6-3513-405b-a810-de1c0839fbf4.mock.pstmn.io/products`)
        setProducts(response.data.Items)
    }

    return (
        <>
            <Navbar/>
            <div className="HomeRootContainer">
                <h1 className="HomePageHeader">Hello {userState.user ?
                    userState.user.firstName + ","
                    : " "}
                </h1>
                <button onClick={() => {
                    dispatch(logoutUser())
                }}>LogOut
                </button>
            </div>

            <h3>Products</h3>
            <div className="productContainer">
                {
                    products.map((product) => {
                        return <Product props={product}/>
                    })
                }
            </div>
        </>
    )
}

export default Home;