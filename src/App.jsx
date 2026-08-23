import { useState, useEffect } from 'react'
import { Outlet } from 'react-router';
import { Link } from "react-router";

function App() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageHeader, setPageHeader] = useState('Homepage!');
  const [cartItems, setCartItems] = useState([]);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setItems(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  },[]);

  return (
    <>
      <h1>{pageHeader}</h1>
      <nav>
        <span><Link to="/" onClick={() => setPageHeader('Homepage!')}>Home</Link></span>
        <span><Link to="shop" onClick={() => setPageHeader("Shop!")}>Shop</Link></span>
        <span><Link to="shoppingcart" onClick={() => setPageHeader("Shopping Cart")}>Cart({totalItemsInCart})</Link></span>
      </nav>
      {/* <Outlet context={[items, setItems]} /> */}
      <Outlet context={{items, setItems, error, setError, loading, setLoading, cartItems, setCartItems, totalItemsInCart, setTotalItemsInCart}} />
    </>
  )
}

export default App;
