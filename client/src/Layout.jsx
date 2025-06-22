import {Outlet} from "react-router-dom";
import Header from "./comonents/Header";
import Footer from "./comonents/Footer";

const Layout = () => {
    return(
        <>
        
        <Header/>
        <div id="container">
        <Outlet/>
        </div>
        <Footer/>
        
        </>
    )
}

export default Layout;



