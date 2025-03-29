import useAuth from "../hooks/useAuth";


const baseUrl = `http://localhost:3030/data/characters`;

export function useCreateCharacter() {
    const { request } = useAuth();

    function createCharacter(characterData) {
        return request.post(baseUrl, characterData);
    }

    return createCharacter;
}

export function useGetCharacter() {
    const { request } = useAuth();

    function getCharacter(userId) {
        return request.get(`${baseUrl}/${userId}`);
    }

    return getCharacter;
}

export function useEditCharacter() {

}