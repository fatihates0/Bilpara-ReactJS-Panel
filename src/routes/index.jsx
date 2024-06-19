import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Routes, Route, } from "react-router-dom";
import WebLayout from "~/layout/web";
import LoadingComponent from "~/layout/web/component/loading";
import Login from "~/pages/auth/login";
import Logout from "~/pages/auth/logout";
import PrivateRoot from "~/pages/auth/privateRoot";
import Home from "~/pages/home";
import Notifications from "~/pages/notification";
import Sorular from "~/pages/questions";
import Users from "~/pages/users";


export default function GeneralRoute() {
    const { user } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.general);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <>
            {loading ? <LoadingComponent /> : null}
            <Routes>
                <Route path="/" element={<PrivateRoot><WebLayout /></PrivateRoot>} >
                    <Route index={true} element={<Home />} />
                    <Route path="users" element={<Users />} />
                    <Route path="questions" element={<Sorular />} />
                    <Route path="questions/:search_key/:page?/:page_size?" element={<Sorular />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>
                <Route path="/auth">
                    <Route index={true} element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </>
    )
}

/*const routes = createBrowserRouter([
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
                index: true,
                element: <Login />
            },
            {
                path: 'logout',
                element: <Logout />
            }
        ]
    }
]);

export default routes*/