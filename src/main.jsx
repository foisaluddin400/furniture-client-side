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
        element: <Shop></Shop>
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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <div className='max-w-screen-2xl mx-auto'>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
  </StrictMode>,
)
