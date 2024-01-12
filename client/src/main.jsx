import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//! Components
import App from './App.jsx'
import Login from './components/Login.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import IndexRoomTypes from './components/IndexRoomTypes.jsx'
import IndexFfes from './components/IndexFfes.jsx'

//! Styles
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                // element: <Home />,
                // loader: getTvIndex,
            },
            {
                path: "/roomTypes",
                element: <IndexRoomTypes />,
                // loader: getTvIndex,
            },
            {
                path: "/ffes",
                element: <IndexFfes />,
                // loader: getTvIndex,
            },
            {
                path: '/about',
                // element: <About />,
            },
            {
                path: '/resources',
                // element: <About />,
            },
            {
                path: '/profile',
                // element: <Profile />,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <RegisterUser />,
            }
        ]
    }
]
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
