import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//! Components
import App from './App.jsx'
import Login from './components/Login.jsx'

//! Styles
import './styles/main.scss'


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
                // element: <RoomTypeIndex />,
                // loader: getTvIndex,
            },
            {
                path: "/ffes",
                // element: <RoomTypeIndex />,
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
            // {
            //     path: '/register',
            //     element: <RegisterUser />,
            // }
        ]
    }
]
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
