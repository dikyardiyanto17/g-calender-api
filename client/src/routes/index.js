import { createBrowserRouter } from 'react-router-dom'
import {redirect} from 'react-router-dom'
import LandingPage from '../views/LandingPage';
import Home from '../views/Home';

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            if (!localStorage.access_token) throw redirect('/landingpage')
            return null
        },
        children: [
            {
                path: "",
                element: (
                    <Home />
                ),
            }
        ]
    },
    {
        path: "/",
        loader: () => {
            if (localStorage.access_token) throw redirect('/')
            return null
        },
        children: [
            {
                path: "landingpage",
                element: (
                    <LandingPage />
                ),
            }
        ]
    }
]);

export default router