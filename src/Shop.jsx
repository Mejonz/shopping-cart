import { useOutletContext } from "react-router";
import { useState } from "react";
import { calcItemsInCart } from "./helpers";
import styles from "./Shop.module.css";

function Shop() {
    const {items, error, loading, cartItems, setCartItems, setTotalItemsInCart } = useOutletContext();
    // const {items, setItems, error, setError, loading, setLoading, cartItems, setCartItems, totalItemsInCart, setTotalItemsInCart } = useOutletContext();
    
    if (loading) return <h2>Loading...</h2>;
    if (error !== null) return <h2>A network error has occured!</h2>;

    function Card({targetItem, initalNumberOfItem = 0}) {
        const [numberOfItem, setNumberOfItem] = useState(initalNumberOfItem);

        function handleInputChange(e) {
            // setNumberOfItem(Number(e.target.value));
            const inputValue = e.target.value;
            const ensureNumericValue = inputValue.replace(/[^0-9]/g, '');
            setNumberOfItem(Number(ensureNumericValue));
        }
        
        function handleIncrement() {
            setNumberOfItem(prev => prev + 1)
        }

        function handleDecrement() {
            if (numberOfItem <= 0) return;
            setNumberOfItem(prev => prev - 1);
        }

        function checkIfInArray(arraytoCheck, id) {
            for (let i = 0; i < arraytoCheck.length; i++) {
                if (id === arraytoCheck[i].id) return true;
            }
            return false;
        }

        function addItemToCart(item, amountInCart) {
            const newItem = {id: item.id, title: item.title, price: item.price, image: item.image, amount: amountInCart};
            const checkIfInCart = checkIfInArray(cartItems, newItem.id);
            // console.log(checkIfInCart);
            if (checkIfInCart === true) {
                const newList = cartItems.map((item) => {
                    if (item.id === newItem.id) {
                        return { ...item, amount: item.amount + newItem.amount };
                    }
                    return item;
                });
                setCartItems(prevItems => newList);
                setTotalItemsInCart(calcItemsInCart(newList));
                // console.log(cartItems);
                // console.log(totalItemsInCart);
            }

            //figure out how to use local variable so it updates immediately
            else {
                // setCartItems(prevItems => [...prevItems, newItem]);
                const newArray = cartItems;
                newArray.push(newItem);
                setCartItems(prevItems => newArray);
                setTotalItemsInCart(calcItemsInCart(newArray));
                console.log(cartItems);
                // console.log(totalItemsInCart);
            }
        }


        return (
            <div className={styles.cardContainer}>
                <h3>{targetItem.title}</h3>
                <img src={targetItem.image} />
                <p className={styles.description}>{targetItem.description}</p>
                <p>Price: ${targetItem.price}</p>
                <input value={numberOfItem} onChange={handleInputChange} />
                <div>
                    <button onClick={() => handleIncrement()}>+</button>
                    <button onClick={() => handleDecrement()}>-</button>
                    <button onClick={() => addItemToCart(targetItem, numberOfItem)}>Add to Cart</button>
                </div>
            </div>
        )
    }

    const itemsList = items.map(item =>
        <li key={item.id}>
            <Card targetItem={item} />
        </li>
    )

    return (
        <>
            <h2>Shop content</h2>
            <ul>{itemsList}</ul>
        </>
    )
}

export default Shop;