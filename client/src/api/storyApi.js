import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/requester";

const baseUrl = `http://localhost:3030/data/stories`;

export function useCreateStory() {
    const { request } = useAuth();


    function createStory(storyData) {
        return request.post(baseUrl, storyData);
    }

    return createStory;
}

export function useGetAllStories() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then(setStories);
    }, []);

    return stories;
}

export function useGetOneStory(storyId) {
    const [story, setStory] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${storyId}`).then(setStory);
    }, [storyId]);

    return story;
}