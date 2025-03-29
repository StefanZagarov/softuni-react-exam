import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router";

export default function Header() {
    const { username, isAuthenticated } = useAuth();

    return (
        <div className={styles["nav-container"]}>
            <h2 className={styles["logo"]}> <Link to="/"> <p>The</p> Drunken Dragon</Link></h2>

            <nav className={styles["nav-links"]}>

                <ul>
                    <NavLink to="/stories" className={({ isActive }) => `${isActive ? styles["active"] : ``}`}>
                        <li>
                            Stories
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    {isAuthenticated ?
                        <>
                            <NavLink to="/character" className={({ isActive }) => `${isActive ? styles["active"] : ``}`}>
                                <li>
                                    Character
                                    <div className={styles["border"]}> </div>
                                </li>
                            </NavLink>

                            <NavLink to="/create-story" className={({ isActive }) => `${isActive ? styles["active"] : ``}`}>
                                <li>
                                    Create Story
                                    <div className={styles["border"]}> </div>
                                </li>
                            </NavLink>
                            <NavLink to="/logout">
                                <li>
                                    Logout
                                    <div className={styles["border"]}> </div>
                                </li>
                            </NavLink>
                        </>
                        :
                        <> <NavLink to="/login" className={({ isActive }) => `${isActive ? styles["active"] : ``}`}>
                            <li>
                                Login
                                <div className={styles["border"]}> </div>
                            </li>
                        </NavLink>

                            <NavLink to="/register" className={({ isActive }) => `${isActive ? styles["active"] : ``}`}>
                                <li>
                                    Register
                                    <div className={styles["border"]}> </div>
                                </li>
                            </NavLink>
                        </>
                    }

                    <NavLink to="/about" className={({ isActive }) => `${isActive ? styles["active"] : ``}`}>
                        <li>
                            About
                            <div className={styles["border"]}> </div>
                        </li>
                    </NavLink>

                    <div className={styles["username"]}>
                        {username ? username : ``}
                    </div>
                </ul>
            </nav>
        </div>
    );
}