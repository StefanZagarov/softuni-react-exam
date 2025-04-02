import { useCallback, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import requester from "../utils/requester";

const baseUrl = `http://localhost:3030/data/characters`;

export function useCreateCharacter() {
    const { request } = useAuth();
    const abortRef = useRef(null);

    function createCharacter(characterData) {
        if (abortRef.current) {
            abortRef.current.abort();
        }
        abortRef.current = new AbortController();

        return request.post(
            baseUrl,
            characterData,
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

    return createCharacter;
}

// The useGetCharacter hook responsible for fetching the character data was being triggered repeatedly on every render cycle.
// Since this hook returns a function, it returns a new function reference each re-render
// And since the useEffect in Character depends on getCharacter, it triggers on each new reference
// The trigger happens on each setCharacter, it makaes useGetCharacter to return a new reference to getCharacter, thus causing infinite loop
// The useCallback hook is designed specifically to solve this problem. It memoizes a function, meaning it returns the exact same function reference across multiple renders, as long as its own dependencies haven't changed

// useCallback takes the function definition and a dependency array
// With an empty dependency array([]), useCallback creates the function reference only once when the hook first runs
// On subsequent renders, useCallback sees that its dependencies([]) haven't changed, so it returns the previously created, identical function reference

// export function useGetCharacter() {
//     async function getCharacter(userId) {
//         const character = await requester.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
//         return character;
//     }
//     return getCharacter;
// }

export function useGetCharacter() {
    const abortRef = useRef(null);

    const getCharacter = useCallback(async (userId) => {
        if (abortRef.current) {
            abortRef.current.abort();
        }
        abortRef.current = new AbortController();

        const character = await requester.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
        return character[0];
    }, []);

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return getCharacter;
}

export function useEditCharacter() {
    const { request } = useAuth();
    const abortRef = useRef(null);

    function editCharacter(characterId, characterData) {
        if (abortRef.current) {
            abortRef.current.abort();
        }
        abortRef.current = new AbortController();

        return request.put(`${baseUrl}/${characterId}`,
            characterData,
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

    return editCharacter;
}