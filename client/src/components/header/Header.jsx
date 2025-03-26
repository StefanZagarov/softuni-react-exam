import styles from "./Header.module.css";
import { Link, NavLink } from "react-router";

export default function Header() {
    return (
        <div className={styles["nav-container"]}>
            <h2 className={styles["logo"]}> <Link to="/"> <p>The</p> Drunken Dragon</Link></h2>

            <nav className={styles["nav-links"]}>

                <ul>
                    <NavLink to="/catalog">
                        <li>
                            Stories
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    {/* Logged in */}
                    <NavLink to="/character">
                        <li>
                            Character
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    <NavLink to="/create-story">
                        <li>
                            Create Story
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    {/* Logged out */}
                    <NavLink to="/login">
                        <li>
                            Login
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    <NavLink to="/register">
                        <li>
                            Register
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    <NavLink to="/logout">
                        <li>
                            Logout
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    {/* {About the site} */}
                    <NavLink to="/about">
                        <li>
                            About
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>
                </ul>

            </nav>
        </div>
    );
}