import { useActionState } from "react";
import { useRegister } from "../../api/authApi";
import styles from "./Register.module.css";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();
    // Register custom hook
    const register = useRegister();
    // TODO: Automatic login

    async function registerHandler(previousState, formData) {
        const { username, password, rePass } = Object.fromEntries(formData);

        if (password !== rePass) {
            // TODO: Add a toaster
            console.log(`Passwords do not match!`);
            return;
        }

        try {
            const userData = await register(username, password);
            console.log(userData);

            // Login function which will have redirect and state storage in it
            navigate(`/login`);
        } catch (error) {
            console.log(error);
        }

    }

    // Streamline the management of form state by updating a component's state based on the results of form actions

    const [_, registerAction, isPending] = useActionState(registerHandler, { username: ``, password: ``, rePassword: `` });

    return (
        <>
            <h2 className={styles[`header`]}>Register</h2>

            <form className={styles["container"]} action={registerAction} >
                <label className={styles['label']} htmlFor="username">Username</label>
                <input className={styles['input']} type="text" id="username" name="username" />

                <label className={styles['label']} htmlFor="password">Password</label>
                <input className={styles['input']} type="password" id="password" name="password" />

                <label className={styles['label']} htmlFor="rePass">Repeat Password</label>
                <input className={styles['input']} type="password" id="rePass" name="rePass" />

                <button className={styles["btn"]} disabled={isPending} style={{ backgroundColor: isPending ? `lightgray` : `` }}>Register</button>
            </form >
        </>
    );
};

