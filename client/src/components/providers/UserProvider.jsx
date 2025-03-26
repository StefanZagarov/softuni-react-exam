import { useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function UserProvider(
    // The UseProvider component automatically gets all components it wraps in the `children` property
    { children }
) {
    // TODO: Upgrade to a persisted state - takes localStorage key and value
    const [userData, setState] = useState(``);

    function loginHandler(userData) {
        setState(userData);
    }

    function logoutHandler() {
        // TODO: Edit if this doesnt work right
        setState('');
    }

    // Return a provider
    return (
        <UserContext.Provider value={{ ...userData, loginHandler, logoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}