import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//! Components
import App from './App.jsx'
import PageHome from './components/PageHome.jsx'
import Login from './components/Login.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import PageBuildings from './components/PageBuildings.jsx'
import PageRoomTypes from './components/PageRoomTypes.jsx'
import PageFFEs from './components/PageFFEs.jsx'
import SingleBuilding from './components/SingleBuilding.jsx'
import SingleRoomType from './components/SingleRoomType.jsx'
import PageProfile from './components/PageProfile.jsx'
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
                path: '/',
                element: <PageHome />,
                // loader: getTvIndex,
            },
            {
                path: '/buildings',
                element: <PageBuildings />,
                // loader: getTvIndex,
            },
            {
                path: '/buildings/:bldgId',
                element: <SingleBuilding />,
                loader: async ({ params }) => getIndBuilding(params.bldgId)
            },
            {
                path: '/roomTypes/:roomTypeId',
                element: <SingleRoomType />,
                loader: async ({ params }) => getIndRoomType(params.roomTypeId)
            },
            {
                path: '/roomTypes/',
                element: <PageRoomTypes display={'none'} />,
            },
            {
                path: '/ffes/',
                element: <PageFFEs display={'none'} />,
            },
            {
                path: '/about/',
                // element: <About />,
            },
            {
                path: '/resources/',
                // element: <Resources />,
            },
            {
                path: '/profile/',
                element: <PageProfile />,
                // loader: async () => getLoggedInUser()
            },
            {
                path: '/login/',
                element: <Login />
            },
            {
                path: '/register/',
                element: <RegisterUser />,
            }
        ]
    }
]
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
