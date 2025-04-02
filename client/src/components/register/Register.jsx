import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useRegister } from "../../api/authApi";
import styles from "./Register.module.css";
import { useUserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();
    const register = useRegister();
    const { userLoginHandler } = useUserContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const errorToastOptions = {
        position: `top-right`,
        className: styles["toast"],

        style: {
            color: `#FFFFFF`,
            backgroundColor: `#E78F00`,
            border: `2px solid red`
        }
    };

    const successToastOptions = {
        position: `top-right`,
        className: styles["toast"],

        style: {
            color: `#FFFFFF`,
            backgroundColor: `#E78F00`,
            border: `2px solid green`
        }
    };

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const rePassRef = useRef(null);
    const formRef = useRef(null); // Ref for the form element itself (for resetting)

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        rePass: ''
    });


    function handleChange(e) {
        const { name, value } = e.target;

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            const trimmedValue = value.trim();

            switch (name) {
                case `username`: {
                    if (!trimmedValue) {
                        newErrors.username = 'Username is required';
                    } else if (trimmedValue.length < 3) {
                        newErrors.username = 'Username must be at least 3 characters';
                    } else if (trimmedValue.length > 16) {
                        newErrors.username = `Username can't be more than 16 characters long`;
                    } else {
                        newErrors.username = '';
                    }
                    break;
                }

                case `password`: {
                    if (!value) {
                        newErrors.password = 'Password is required';
                    } else if (value.length < 5) {
                        newErrors.password = 'Password must be at least 5 characters';
                    } else if (value.length > 20) {
                        newErrors.password = `Password can't be more than 20 characters long`;
                    } else {
                        newErrors.password = '';
                    }

                    const currentRePass = rePassRef.current?.value || '';
                    if (currentRePass && value !== currentRePass) {
                        newErrors.rePass = 'Passwords do not match';
                    } else if (currentRePass && newErrors.password === '') {
                        if (prevErrors.rePass === 'Passwords do not match') {
                            newErrors.rePass = '';
                        }
                    }
                    break;
                }

                case `rePass`: {
                    if (!value) {
                        newErrors.rePass = 'Please repeat the password';
                    } else {
                        newErrors.rePass = '';
                    }
                    break;
                }

                default:
                    break;
            }

            return newErrors;
        });
    };

    function validateOnSubmit(username, password, rePass) {
        const validationErrors = { username: '', password: '', rePass: '' };
        let isValid = true;

        if (!username) {
            validationErrors.username = 'Username is required';
            isValid = false;
        } else if (username.length < 3) {
            validationErrors.username = 'Username must be at least 3 characters';
            isValid = false;
        } else if (username.length > 16) {
            validationErrors.username = `Username can't be more than 16 characters long`;
            isValid = false;
        }

        if (!password) {
            validationErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        } else if (password.length > 20) {
            validationErrors.password = `Password can't be more than 20 characters long`;
            isValid = false;
        }

        if (!rePass) {
            validationErrors.rePass = 'Please repeat the password';
            isValid = false;
        } else if (password && password !== rePass) {
            validationErrors.rePass = 'Passwords do not match';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const username = usernameRef.current?.value.trim() || '';
        const password = passwordRef.current?.value.trim() || '';
        const rePass = rePassRef.current?.value.trim() || '';

        const isValid = validateOnSubmit(username, password, rePass);

        if (!isValid) {
            passwordRef.current.value = ``;
            rePassRef.current.value = ``;
            return;
        }

        setIsSubmitting(true);
        // Clear errors
        setErrors(prev => ({ ...prev }));

        try {
            const userData = await register(username, password);

            // Abort controller
            if (userData?.name === `AbortError`) {
                console.log(`ABORTED`);
                return;
            }
            if (userData.code === 409) {
                toast.error(`A user with the same username already exists`, errorToastOptions);
                passwordRef.current.value = ``;
                rePassRef.current.value = ``;

                return;
            }

            userLoginHandler(userData);
            toast.success(`Registered`, successToastOptions);
            navigate(`/stories`);
            return;

        } catch (error) {
            console.error("An error occurred during registration:", error);
            toast.error(`An error occurred during registration. Try again`, errorToastOptions);
            setErrors(prev => ({ ...prev }));
            if (formRef.current) {
                formRef.current.reset();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <h2 className={styles[`header`]}>Register</h2>

            <form ref={formRef} onSubmit={handleSubmit} className={styles["container"]} noValidate>

                {errors.form && (
                    <p className={styles["error-server"]}>{errors.form}</p>
                )}

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="username">Username</label>
                    <input
                        ref={usernameRef}
                        onChange={handleChange}
                        className={`${styles['input']} ${errors.username ? styles['input-error'] : ''}`}
                        type="text" id="username" name="username" required
                    />
                    <div><p id="username-error" className={styles["error"]}>{errors.username}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="password">Password</label>
                    <input
                        ref={passwordRef}
                        onChange={handleChange}
                        className={`${styles['input']} ${errors.password ? styles['input-error'] : ''}`}
                        type="password" id="password" name="password" required
                    />
                    <div><p id="password-error" className={styles["error"]}>{errors.password}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="rePass">Repeat Password</label>
                    <input
                        ref={rePassRef}
                        onChange={handleChange}
                        className={`${styles['input']} ${errors.rePass ? styles['input-error'] : ''}`}
                        type="password" id="rePass" name="rePass" required
                    />
                    <div><p id="repass-error" className={styles["error"]}>{errors.rePass}</p></div>
                </div>

                <button
                    type="submit"
                    className={styles["btn"]}
                    disabled={isSubmitting}
                    style={{ backgroundColor: isSubmitting ? `lightgray` : `` }}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form >
        </>
    );
};