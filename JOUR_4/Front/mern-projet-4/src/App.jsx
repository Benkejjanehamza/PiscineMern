import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./composant/register.jsx";
import Welcome from "./composant/welcome.jsx";
import Connexion from "./composant/connexion.jsx";
import ProtectedRoute from "../protectedRoute.jsx";
import ProtectedRouteAdmin from "../protectedAdmin.jsx";
import BlogUser from "./composant/blogUser.jsx";
import CreateBillet from "./composant/createBillet.jsx";
import UpdateBillet from "./composant/updateBillet.jsx";
import AllBillets from "./composant/allBillets.jsx";
import DetailBillet from "./composant/detailBillet.jsx";


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
        path: '/connexion',
        element:<div> <Connexion /></div>
    },
    {
        path: '/:login',
        element:<div> <BlogUser /></div>
    },
    {
        path: '/createBillet/:login',
        element: <ProtectedRoute element={CreateBillet} />
    },
    {
        path: '/updateBillet/:login',
        element:<ProtectedRoute element={UpdateBillet} />
    },
    {
        path: '/',
        element:<ProtectedRoute element={AllBillets} />
    },
    {
        path: '/detailBillet/:login',
        element: <ProtectedRoute element={DetailBillet} />
    },


]);

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App;