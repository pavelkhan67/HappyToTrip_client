import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Pages/Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../UserLog/Login";
import Register from "../UserLog/Register";
import SinglePlace from "../Pages/Shared/SinglePlace";
import SingleHotel from "../Pages/Shared/SingleHotel";
import AllHotels from "../Pages/AllHotels/AllHotels";
import AllPlaces from "../Pages/AllPlaces/AllPlaces";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Layout/Dashboard";
import MyPlaceList from "../Pages/Dashboard/Users/MyPlaceList/MyPlaceList";
import MyBookings from "../Pages/Dashboard/Users/MyBookings/MyBookings";
import PaymentHistory from "../Pages/Dashboard/Users/PaymentHistory/PaymentHistory";
import Payment from "../Pages/Dashboard/Users/Payment/Payment";
import MyBooked from "../Pages/Dashboard/Users/MyBooked/MyBooked";
import AllUsers from "../Pages/Dashboard/Admin/ManageUsers/AllUsers";
import ManageHotels from "../Pages/Dashboard/Admin/ManageHotels/ManageHotels";
import AddHotel from "../Pages/Dashboard/Manager/AddHotel/AddHotel";
import MyHotels from "../Pages/Dashboard/Manager/MyHotels/MyHotels";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/places",
                element: <AllPlaces></AllPlaces>
            },
            {
                path: "/place/:id",
                element: <SinglePlace></SinglePlace>,
                loader: ({ params }) => fetch(`http://localhost:5000/place/${params.id}`)
            },
            {
                path: "/hotels",
                element: <AllHotels></AllHotels>
            },
            {
                path: "/hotel/:id",
                element: <SingleHotel></SingleHotel>,
                loader: ({ params }) => fetch(`http://localhost:5000/hotel/${params.id}`)
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // User Route
            {
                path: 'myselected',
                element: <MyPlaceList></MyPlaceList>
            },
            {
                path: 'mybookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: 'paymenthistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            {
                path: 'mybooked',
                element: <MyBooked></MyBooked>
            },

            // Instructor route
            {
                path: 'addhotel',
                element: <AddHotel></AddHotel>
            },
            {
                path: 'myhotel',
                element: <MyHotels></MyHotels>
            },

            // Admin route
            {
                path: "allusers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "managehotel",
                element:<ManageHotels></ManageHotels>
            }

        ]
    }

]);