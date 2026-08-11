import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ShoppingCart from './ShoppingCart'
import Shop from './Shop'
import Homepage from './Homepage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "shop", element: <Shop /> },
      { path: "shoppingcart", element: <ShoppingCart /> },
    ],
  },
  // {
  //   path: "shop",
  //   element: <Shop />,
  // },
  // {
  //   path: "shoppingcart",
  //   element: <ShoppingCart />,
  // },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
