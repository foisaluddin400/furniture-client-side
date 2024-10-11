import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import Home from './Page/Home';
import About from './Page/About';
import Shop from './Page/Shop';
import Contact from './Page/Contact';
import Login from './Login/Login';
import Register from './Login/Register';
import AuthProvider from './AuthProvider/AuthProvider';
import PrivetRouter from './AuthProvider/PrivetRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Page/ProductDetails';
import MyCart from './Page/MyCart';
import NavbarDashboard from './Dashboard/NavbarDashboard';
import UserHome from './Dashboard/User/UserHome';
import MyAdress from './Dashboard/User/MyAdress';
import Payment from './Dashboard/User/Payment';
import AdminAddProduct from './Dashboard/Admin/AdminAddProduct';
import AdminEditProduct from './Dashboard/Admin/AdminEditProduct';
import AdminRollUser from './Dashboard/Admin/AdminRollUser';
import AdminUserHome from './Dashboard/Admin/AdminUserHome';
import AdminOrderList from './Dashboard/Admin/AdminOrderList';
import AdminUpdate from './Dashboard/Admin/AdminUpdate';
import AdminRout from './AuthProvider/AdminRout';
import PaymentHistory from './Dashboard/User/PaymentHistory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/shop",
        element: <PrivetRouter><Shop></Shop></PrivetRouter>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
        loader: async ({ params }) => {
          console.log(params.id); // Check if this ID is correct
          const res = await fetch(`https://furniture-website-server.vercel.app/menu/${params.id}`);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json(); // Make sure you return the JSON data
        }
        
        
        
      },

      //dashboard
      {
        path: "/",
        element: <NavbarDashboard></NavbarDashboard>,
        children:[

          //user
          {
            path: "/cart",
            element: <MyCart></MyCart>
          },
          {
            path: "/userhome",
            element: <UserHome></UserHome>
          },
          {
            path: "/myadress",
            element: <MyAdress></MyAdress>
          },
          {
            path: "/payment",
            element: <Payment></Payment>
          },
          {
            path: "/paymenthistory",
            element: <PaymentHistory></PaymentHistory>
          },
          //admin
          {
            path: "/adminaddproduct",
            element: <AdminRout><AdminAddProduct></AdminAddProduct></AdminRout>
          },
          {
            path: "/admineditproduct",
            element: <AdminRout><AdminEditProduct></AdminEditProduct></AdminRout>
          },
          {
            path: "/adminroll",
            element: <AdminRout><AdminRollUser></AdminRollUser></AdminRout>
          },
          {
            path: "/adminuser",
            element: <AdminRout><AdminUserHome></AdminUserHome></AdminRout>
          },
          {
            path: "/adminorder",
            element: <AdminRout><AdminOrderList></AdminOrderList></AdminRout>
          },
          {
            path: "/adminupdate/:id",
            element: <AdminRout><AdminUpdate></AdminUpdate></AdminRout>,
            loader: ({params})=> fetch(`https://furniture-website-server.vercel.app/menu/${params.id}`)
          },


        ]
      },
      
      
    ],
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <div className='max-w-screen-2xl mx-auto '>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
