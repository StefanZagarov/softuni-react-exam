import useAuth from "../hooks/useAuth";

const baseUrl = `http://localhost:3030/data/stories`;

export function useCreateStory() {
    const { request } = useAuth();


    function createStory(storyData) {
        return request.post(baseUrl, storyData);
    }

    return createStory;
}