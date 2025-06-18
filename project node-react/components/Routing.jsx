// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Route, Routes } from "react-router";
import { Home } from "./Home"
import { Details } from './details'
import { Search2 } from "./Search2";
import { Search1 } from "./Search1";
import { Search3 } from "./Search3";
import { Search4 } from "./Search4";
import Form from "./LoginSignUp"
import { PublishApartment } from "./PublishApartment"

export const Routing = () => {
    return <>
        <Routes>
            <Route path="/apartment/:id" element={<Details></Details>} />
            <Route path="/Search/:idCategory?/:beds?" element={<Search2></Search2>} />
            <Route path="/searchh/:name" element={<Search1></Search1>} />
            <Route path="/price/:price/:type" element={<Search3></Search3>} />
            <Route path="/filter/:filter" element={<Search4></Search4>} />
            <Route path="/Login" element={<Form></Form>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="" element={<Home></Home>} />
            <Route path="/publish" element={<PublishApartment></PublishApartment>} />
        </Routes>
    </>
}