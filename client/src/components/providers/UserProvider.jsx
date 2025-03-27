import { UserContext } from "../../contexts/UserContext";
import usePersistedState from "../../hooks/usePersistedState";

// Provide the values from `UserContext.js` to the whole app (the components wrapped in UseProvider in App.jsx)
export default function UserProvider(
    // The UseProvider component automatically gets all components it wraps in the `children` property
    { children }
) {
    const [userData, setUserData] = usePersistedState(`userAuth`, ``);

    function userLoginHandler(inputData) {
        const { _id, accessToken, username } = inputData;
        setUserData({ _id, accessToken, username });
    }

    function userLogoutHandler() {
        setUserData('');
    }

    // Return a provider
    return (
        <UserContext.Provider value={{ ...userData, userLoginHandler, userLogoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}