import { useActionState } from "react";
import { useLogin } from "../../api/authApi";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const login = useLogin();
    const [_, loginAction, isPending] = useActionState(loginHandler, { username: ``, password: `` });

    // Get login handling function from the user context so we can update the app with the login data
    const { userLoginHandler } = useUserContext();
    console.log(userLoginHandler);

    async function loginHandler(_, formData) {
        const { username, password } = Object.fromEntries(formData);

        const data = await login(username, password);
        console.log(`login data:`, data);
        if (data.code === 403) {
            // TODO: Use toaster
            console.log("Wrong username or password");
            return;
        }

        // Update the app with the user data
        userLoginHandler(data);

        navigate(`/`);
    }

    return (
        <>
            <h2 className={styles[`header`]}>Login</h2>

            <form action={loginAction} className={styles["container"]}>
                <label className={styles['label']} htmlFor="username">Username</label>
                <input className={styles['input']} type="text" id="username" name="username" />

                <label className={styles['label']} htmlFor="password">Password</label>
                <input className={styles['input']} type="password" id="password" name="password" />

                <button className={styles["btn"]} disabled={isPending} style={{ backgroundColor: isPending ? `lightgray` : `` }}>Login</button>
            </form>
        </>
    );
}