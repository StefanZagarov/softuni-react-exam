import styles from "./Login.module.css";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    function formActionHandler(formData) {
        console.log(formData);

        navigate(`/`);
    }
    return (
        <>
            <h2 className={styles[`header`]}>Login</h2>

            <form action={formActionHandler} className={styles["container"]}>
                <label className={styles['label']} htmlFor="story-title">Username</label>
                <input className={styles['input']} type="text" id="characterName" name="characterName" />

                <label className={styles['label']} htmlFor="description">Password</label>
                <input className={styles['input']} type="password" id="description" name="description" />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}