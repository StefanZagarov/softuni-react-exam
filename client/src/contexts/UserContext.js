import { createContext, useContext } from "react";

// Create user context - used in the provider
export const UserContext = createContext({
    _id: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});

// Hook for easier import - automates the need to use `useContext`
export function useUserContext() {
    const userData = useContext(UserContext);
    return userData;
}