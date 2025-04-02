// This API deals with user related authentication (register, login, logout). It holds hooks for each of these actions

import { useEffect, useRef } from "react";
import request from "../utils/requester";
import { useUserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export function useRegister() {
    const abortRef = useRef(null);

    async function register(username, password) {

        if (abortRef.current) {
            abortRef.current.abort();
        }

        abortRef.current = new AbortController();

        return await request.post(
            `${baseUrl}/register`,
            { username, password },
            { signal: abortRef.current.signal }
        );
    }

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return register;
}

export function useLogin() {
    // The useEffect wants us to pass the abort controller as a dependency, so we use "ref" to avoid the problem
    // Using useRef  returns an object with a current property that stores a mutable value. 
    // This value persists across renders, so you can update it as needed.
    const abortRef = useRef(null);

    async function login(username, password) {
        // Abort any previous request if it exists
        if (abortRef.current) {
            abortRef.current.abort();
        }
        // Create a new AbortController for this request
        abortRef.current = new AbortController();

        return await request.post(
            `${baseUrl}/login`,
            { username, password },
            { signal: abortRef.current.signal }
        );
    }

    // On component unmount: abort (cleanup)
    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

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