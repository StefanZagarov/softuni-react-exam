import styles from "./Login.module.css";
import { useState } from "react";
import { useLogin } from "../../api/authApi";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const login = useLogin();
    const { userLoginHandler } = useUserContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(oldErrors => {
            const newErrors = { ...oldErrors };
            const trimmedValue = value.trim();

            switch (name) {
                case `username`:
                    if (!trimmedValue) {
                        newErrors.username = `Username is required`;
                    } else if (trimmedValue.length < 3) {
                        newErrors.username = `Username must be at least 3 characters long`;
                    } else if (trimmedValue.length > 16) {
                        newErrors.username = `Username can't be more than 16 characters long`;
                    } else {
                        newErrors.username = ``;
                    }
                    break;

                case `password`:
                    if (!value) {
                        newErrors.password = `Password is required`;
                    } else if (value.length < 5) {
                        newErrors.password = `Password must be at least 5 characters long`;
                    } else if (value.length > 20) {
                        newErrors.password = `Password can't be more than 20 characters long`;
                    } else {
                        newErrors.password = ``;
                    }
                    break;

                default:
                    break;
            }
            return newErrors;
        });
    };

    function validateOnSubmit() {
        const validationErrors = { username: '', password: '' };
        let isValid = true;

        if (!formData.username.trim()) {
            validationErrors.username = 'Username is required';
            isValid = false;
        }
        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
            isValid = false;
        }

        if (errors.username && !validationErrors.username) {
            validationErrors.username = errors.username;
            isValid = false;
        }
        if (errors.password && !validationErrors.password) {
            validationErrors.password = errors.password;
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const isValid = validateOnSubmit();

        if (!isValid) return;

        setIsSubmitting(true);
        // Clear errors
        setErrors(prev => ({ ...prev }));

        try {
            const data = await login(formData.username, formData.password);

            if (data?.code === 403) {
                setErrors(prev => ({ ...prev }));
                // TODO: Use toaster - Invalid username or password
                setFormData(prev => ({ ...prev, password: '' }));
            }
            else {
                userLoginHandler(data);
                navigate(`/stories`);
            }
        } catch (err) {
            console.error("Login API error:", err);
            // TODO: Use toaster - An error occurred during login.
            setErrors(prev => ({ ...prev }));
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <h2 className={styles[`header`]}>Login</h2>

            <form onSubmit={handleSubmit} className={styles["container"]} noValidate>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="username">Username</label>
                    <input
                        className={`${styles['input']} ${errors.username ? styles['input-error'] : ''}`}
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <div><p id="username-error" className={styles["error"]}>{errors.username}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="password">Password</label>
                    <input
                        className={`${styles['input']} ${errors.password ? styles['input-error'] : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div><p id="password-error" className={styles["error"]}>{errors.password}</p></div>
                </div>

                <button
                    type="submit"
                    className={styles["btn"]}
                    disabled={isSubmitting}
                    style={{ backgroundColor: isSubmitting ? `lightgray` : `` }}>
                    {isSubmitting ? `Logging in...` : `Login`}
                </button>
            </form>
        </>
    );
}