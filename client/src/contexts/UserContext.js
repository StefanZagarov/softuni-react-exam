import { createContext, useContext } from "react";

// 1. Create user context - used in the provider
export const UserContext = createContext({
    _id: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});

// 2. Hook for easier import - automates the need to use `useContext`
export function useUserContext() {
    return useContext(UserContext);
}