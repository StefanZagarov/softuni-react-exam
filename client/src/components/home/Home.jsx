import { Link } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles["home-container"]}>
            <div className={styles["welcome-container"]}>
                <h2 className={styles["home"]}>Welcome to <p className={styles["title"]}>The Drunken Dragon!</p></h2>

                <Link to="/stories" className={styles["btn"]}> Go Inside </Link>
            </div>

        </div>
    );
}