// Imports
// import Services from './Services';

import { useContext } from "react";
import { AdminContext } from "../context/adminContext";
import Dashboard from './Dashboard'
import Access from './Access'
import CreateSurvey from './CreateSurvey'
import { verifyCookie } from "../middlewares/cookies";

const Home = () => {
    const { admin } = useContext(AdminContext);
    return (
        <div className="admin-wrapper">
            {verifyCookie('admin') ? <Dashboard /> : <Access />}
            {verifyCookie('admin') ? <CreateSurvey /> : <Access />}
        </div>
    )
}
export default Home;