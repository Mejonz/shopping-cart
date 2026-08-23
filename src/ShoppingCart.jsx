// import { useState } from "react";
import { useOutletContext } from "react-router";
import { calcItemsInCart } from "./helpers";
import styles from "./ShoppingCart.module.css";

function ShoppingCart() {
    const { cartItems, setCartItems, totalItemsInCart, setTotalItemsInCart } = useOutletContext();
    // const {items, setItems, error, setError, loading, setLoading, cartItems, setCartItems, totalItemsInCart, setTotalItemsInCart } = useOutletContext();

    if (totalItemsInCart === 0) return <h2>cart empty</h2>

    function getTotalPrice() {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            const subtotal = cartItems[i].price * cartItems[i].amount;
            total += subtotal;
        }
        return total.toFixed(2);
    }

    function handleIncrement(targetItem) {
        const newItem = {id: targetItem.id, title: targetItem.title, price: targetItem.price, image: targetItem.image, amount: targetItem.amount + 1};
        const newList = cartItems.map((item) => {
            if (newItem.id === item.id) {
                return newItem;
            }
            return item;
        })
        setCartItems(prev => newList);
        setTotalItemsInCart(calcItemsInCart(newList));
    }

    function handleDecrement(targetItem) {
        if (targetItem.amount > 0) {
            const newItem = {id: targetItem.id, title: targetItem.title, price: targetItem.price, image: targetItem.image, amount: targetItem.amount - 1};
            const newList = cartItems.map((item) => {
                if (newItem.id === item.id) {
                    return newItem;
                }
                return item;
            })
            setCartItems(newList);
            setTotalItemsInCart(calcItemsInCart(newList));
        }
    }

    function handleDeleteCartItem(targetItem) {
        const newList = cartItems.filter(item => item.id !== targetItem.id);
        setCartItems(prev => newList);
        setTotalItemsInCart(calcItemsInCart(newList));
    }

    function CartItem({targetItem}) {
        const subtotal = targetItem.price * targetItem.amount;
        return (
            <div className={styles.cartItem}>
                <h3>{targetItem.title}</h3>
                <img src={targetItem.image} />
                <p>Amount: {targetItem.amount}</p>
                <p>Subtotal: {subtotal} </p>
                <div>
                    <button onClick={() => handleIncrement(targetItem)}>+</button>
                    <button onClick={() => handleDecrement(targetItem)}>-</button>
                    <button onClick = {() => handleDeleteCartItem(targetItem)}>remove item</button>
                </div>
            </div>
        )
    }

    const cartItemsList = cartItems.map(cartItem =>
        <li key={cartItem.id}>
            <CartItem targetItem={cartItem} />
        </li>
    )

    return (
        <>
            <h2>cart contents</h2>
            <ul className={styles.cartList}>{cartItemsList}</ul>
            <p className={styles.totalPrice}>Total price: {getTotalPrice()}</p>
        </>
    )
}

export default ShoppingCart;