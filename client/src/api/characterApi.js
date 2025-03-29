import { useCallback } from "react";
import useAuth from "../hooks/useAuth";
import requester from "../utils/requester";

const baseUrl = `http://localhost:3030/data/characters`;

export function useCreateCharacter() {
    const { request } = useAuth();

    function createCharacter(characterData) {
        return request.post(baseUrl, characterData);
    }

    return createCharacter;
}

// The useGetCharacter hook responsible for fetching the character data was being triggered repeatedly on every render cycle.
// Since this hook returns a function, it returns a new function reference each re-render
// And since the useEffect in Character depends on getCharacter, it triggers on each new reference
// The trigger happens on each setCharacter, it makaes useGetCharacter to return a new reference to getCharacter, thus causing infinite loop
// The useCallback hook is designed specifically to solve this problem. It memoizes a function, meaning it returns the exact same function reference across multiple renders, as long as its own dependencies haven't changed

// export function useGetCharacter() {
//     async function getCharacter(userId) {
//         const character = await requester.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
//         return character;
//     }
//     return getCharacter;
// }

export function useGetCharacter() {
    // May be unstable
    const getCharacter = useCallback(async (userId) => {

        const character = await requester.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
        console.log(character);
        return character;

    }, []);
    return getCharacter;
}

export function useEditCharacter() {
    const { request } = useAuth();

    function editCharacter(userId, characterData) {
        return request.put(`${baseUrl}/${userId}`, characterData);
    }

    return editCharacter;
}