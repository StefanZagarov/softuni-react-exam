// This API deals with user related authentication (register, login, logout). It holds hooks for each of these actions

import { useEffect, useRef } from "react";
import request from "../utils/requester";
import { useUserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';
// TODO: Check abort controllers
export function useRegister() {
    // Abort controller to avoid duplicate requests
    // const abortRef = useRef(new AbortController());

    async function register(username, password) {
        return await request.post(
            `${baseUrl}/register`,
            { username, password },
            // { signal: abortRef.current.signal }
        );
    }

    // Trigger the abort on duplicated request
    // useEffect(() => {
    //     const abortController = abortRef.current;
    //     return () => abortController.abort();
    // }, []);

    return register;
}

export function useLogin() {
    // Abort controller to avoid duplicate requests
    // const abortRef = useRef(new AbortController());

    async function login(username, password) {
        return await request.post(
            `${baseUrl}/login`,
            { username, password },
            // { signal: abortRef.current.signal }
        );
    }

    // Trigger the abort on duplicated request
    // useEffect(() => {
    //     const abortController = abortRef.current;
    //     return () => abortController.abort();
    // }, []);

    return login;
}

export function useLogout() {
    // Abort controller to avoid duplicate requests
    // const abortRef = useRef(new AbortController());

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

    // Trigger the abort on duplicated request
    // useEffect(() => {
    //     const abortController = abortRef.current;
    //     return () => abortController.abort();
    // }, []);

    return { isLoggedOut: !!accessToken };
}