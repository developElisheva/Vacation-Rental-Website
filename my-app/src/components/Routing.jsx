import { Route, Routes } from "react-router";
import { Home } from "./Home"
import { Search2 } from "./Search2";
import { Search1 } from "./Search1";
import { Search3 } from "./Search3";
import { Search4 } from "./Search4";
import LoginSignUp from "./LoginSignUp"
import { PublishApartment } from "./PublishApartment"
import { Details } from "./Details"
import My_apartments  from "./My_apartments"
import EditApartment from "./Edit"
export const Routing = () => {
    return <>
        <Routes>
            <Route path="/Details/:id" element={<Details></Details>} />
            <Route path="/apartment/:id" element={<Details></Details>} />
            <Route path="/Search/:idCategory?/:beds?" element={<Search2></Search2>} />
            <Route path="/searchh/:name" element={<Search1></Search1>} />
            <Route path="/price/:price/:type" element={<Search3></Search3>} />
            <Route path="/filter/:filter" element={<Search4></Search4>} />
            <Route path="/apartment/advertiser/:id" element={<My_apartments></My_apartments>} />
            <Route path="/Login" element={<LoginSignUp></LoginSignUp>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="" element={<Home></Home>} />
            <Route path="/publish" element={<PublishApartment></PublishApartment>} />
            <Route path="/edit/:idApartment/:idAdveniter" element={<EditApartment></EditApartment>} />
        </Routes>
    </>
}
