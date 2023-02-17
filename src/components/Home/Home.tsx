import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../redux/slices/userSlice";
import {AppDispatch, RootState} from "../../redux/Store";
import Navbar from "../Navbar/Navbar";
import Product from "../Product/Product";
import './Home.css'

const items = [
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    },
    {
        imageURL: "https://drlorishemek.com/wp-content/uploads/2016/08/water-bottle.jpg",
        name: 'Water Bottle',
        price: 35,
        description: 'just a plain water bottle',
        category: 'food'
    }
]



export const Home: React.FC = () => {

    const userState = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!userState.isLoggedIn) navigate('/');
    }, [userState.isLoggedIn]);

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
                    items.map((product) => {
                        return <Product props={product}/>
                    })
                }
            </div>
        </>
    )
}

export default Home;