import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import requester from "../utils/requester";

const baseUrl = `http://localhost:3030/data/stories`;

export function useCreateStory() {
    const { request } = useAuth();


    function createStory(storyData) {
        return request.post(baseUrl, storyData);
    }

    return createStory;
}

export function useEditStory() {
    const { request } = useAuth();

    function editStory(storyId, storyData) {
        return request.put(`${baseUrl}/${storyId}`, storyData);
    };

    return editStory;
}

export function useDeleteStory() {
    const { request } = useAuth();

    function deleteStory(storyId) {
        return request.delete(`${baseUrl}/${storyId}`);
    }

    return deleteStory;
}

export function useGetAllStories() {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        requester.get(baseUrl).then(setStories).finally(() => setIsLoading(false));
    }, [isLoading]);

    return { stories, isLoading };
}

export function useGetOneStory(storyId) {
    const [story, setStory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        requester.get(`${baseUrl}/${storyId}`).then(setStory).finally(() => setIsLoading(false));
    }, [storyId, isLoading]);

    return { story, isLoading };
}