import { createBrowserRouter, } from "react-router-dom";
import WebLayout from "~/layout/web";
import Login from "~/pages/auth/login";
import Logout from "~/pages/auth/logout";
import Home from "~/pages/home";
import Users from "~/pages/users";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <WebLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'users',
                element: <Users />
            }
        ]
    },
    {
        path: '/auth',
        children: [
            {
                index:true,
                element: <Login />
            },
            {
                path: 'logout',
                element: <Logout />
            }
        ]
    }
]);

export default routes