import { Nav } from './nav.jsx';
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Routing";
import Footer from './Footer.jsx';
export const Main = () => {
    return <>
        <BrowserRouter>
            <Nav></Nav>
            <Routing></Routing>
        </BrowserRouter>
        <Footer></Footer>
    </>
}