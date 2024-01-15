import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//! Components
import App from './App.jsx'
import Login from './components/Login.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import FilterBarBldg from './components/FilterBarBldg.jsx'
import FilterBarRT from './components/FilterBarRT.jsx'
import FilterBarFFE from './components/FilterBarFFE.jsx'
import IndBldg from './components/SglBldg.jsx'
import IndRT from './components/SglRT.jsx'
// import IndexRoomTypes from './components/IndexRoomTypes.jsx'
// import IndexFfes from './components/IndexFfes.jsx'

//! Loaders
import { getIndBuilding } from './utils/loaders/buildingsLoader.js'
import { getIndRoomType } from './utils/loaders/roomTypesLoader.js'

//! Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'

//! Router
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: <FilterBarBldg />,
                // loader: getTvIndex,
            },
            {
                path: "/buildings/:bldgId",
                element: <IndBldg />,
                loader: async ({ params }) => getIndBuilding(params.bldgId)
            },
            {
                path: "/roomTypes/:roomTypeId",
                element: <IndRT />,
                loader: async ({ params }) => getIndRoomType(params.roomTypeId)
            },
            {
                path: "/roomTypes",
                element: <FilterBarRT />,
                // loader: getTvIndex,
            },
            {
                path: "/ffes",
                element: <FilterBarFFE />,
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
