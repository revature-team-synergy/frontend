import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../redux/Store";
import Navbar from "../Navbar/Navbar";
import Product from "../Product/Product";
import './Home.css'


export const Home: React.FC = () => {

    const userState = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

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
            </div>

            <Product/>
            
        </>
    )
}

export default Home;