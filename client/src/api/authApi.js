// This API deals with user related authentication (register, login, logout). It holds hooks for each of these actions

import { useEffect } from "react";
import request from "../utils/requester";
import { useUserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export function useRegister() {
    async function register(username, password, signal) {
        return await request.post(
            `${baseUrl}/register`,
            { username, password },
            { signal }
        );
    }

    return register;
}

export function useLogin() {
    async function login(username, password) {
        return await request.post(
            `${baseUrl}/login`,
            { username, password },
            // { signal: abortRef.current.signal }
        );
    }

    return login;
}

export function useLogout() {
    const { accessToken, userLogoutHandler } = useUserContext();

    useEffect(() => {
        if (!accessToken) return;

        const options = {
            header: {
                'X-Authorization': accessToken
            }
        };

        request.get(`${baseUrl}/logout`, null, options)
            .then(userLogoutHandler);
    }, [accessToken, userLogoutHandler]);

    return { isLoggedOut: !!accessToken };
}