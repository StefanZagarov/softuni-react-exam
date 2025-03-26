import styles from "./Register.module.css";

export default function Register() {


    function formActionHandler(formData) {
        console.log(formData);

        // Login function which will have redirect and state storage in it
    }

    return (
        <>
            <h2 className={styles[`header`]}>Register</h2>

            <form action={formActionHandler} className={styles["container"]}>
                <label className={styles['label']} htmlFor="username">Username</label>
                <input className={styles['input']} type="text" id="username" name="username" />

                <label className={styles['label']} htmlFor="password">Password</label>
                <input className={styles['input']} type="password" id="password" name="password" />

                <label className={styles['label']} htmlFor="rePass">Repeat Password</label>
                <input className={styles['input']} type="password" id="rePass" name="rePass" />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
};