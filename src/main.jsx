import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'; // This imports your Tailwind CSS styles

// Importing the main layout and error page components
import Root from './routes/Root.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';

// This function creates all the available routes for your application.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // The Root component is the main layout (Navbar, Footer, etc.)
    errorElement: <ErrorPage />, // This page will show if something goes wrong
    children: [
      {
        index: true, // This makes the Home component the default page for the "/" path
        element: <Home />,
      },
      // Add other pages here later like:
      // { path: "pathName", element: <ComponnetName /> }
    ],
  },
]);

// This renders your entire application into the 'root' div in your index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
