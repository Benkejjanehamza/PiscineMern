import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./composant/register.jsx";
import Welcome from "./composant/welcome.jsx";
import Connexion from "./composant/connexion.jsx";
import ProtectedRoute from "../protectedRoute.jsx";
import Shop from "./composant/shop.jsx";
import ProtectedRouteAdmin from "../protectedAdmin.jsx";
import adminShop from "./composant/adminShop.jsx";
import DetailArticle from "./composant/detailArticle.jsx";


const router = createBrowserRouter([
    {
        path: '/register',
        element:<div> <Register /></div>
    },
    {
        path: '/welcome',
        element: <ProtectedRoute element={Welcome} />
    },
    {
        path: '/shop',
        element: <ProtectedRoute element={Shop}/>
    },
    {
        path: '/detailArticle',
        element: <ProtectedRoute element={DetailArticle}/>
    },
    {
        path: '/shopAdmin',
        element: <ProtectedRouteAdmin element={adminShop}/>
    },
    {
        path: '/connexion',
        element:<div> <Connexion /></div>
    },


]);

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App;