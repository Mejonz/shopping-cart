// import { useState } from "react";
import picture from "./assets/guitar1.jpg";
import styles from "./Homepage.module.css";

function Homepage() {
    return (
        <>
            <h2>Homepage contents</h2>
            <img src={picture} alt="random picture" className={styles.image}/>
        </>
    )
}

export default Homepage;