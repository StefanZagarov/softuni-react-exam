import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import requester from "../utils/requester";

const baseUrl = `http://localhost:3030/data/stories`;

export function useCreateStory() {
    const { request } = useAuth();
    const abortRef = useRef(null);

    function createStory(storyData) {
        if (abortRef.current) {
            abortRef.current.abort();
            return;
        }
        abortRef.current = new AbortController();

        return request.post(baseUrl, storyData, { signal: abortRef.current.signal });
    }

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return createStory;
}

export function useEditStory() {
    const { request } = useAuth();
    const abortRef = useRef(null);

    function editStory(storyId, storyData) {
        if (abortRef.current) {
            abortRef.current.abort();
            return;
        }
        abortRef.current = new AbortController();

        return request.put(`${baseUrl}/${storyId}`, storyData, { signal: abortRef.current.signal });
    };

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

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

    const abortRef = useRef(null);

    useEffect(() => {
        abortRef.current = new AbortController();

        if (!isLoading) return;

        requester.get(baseUrl).then(setStories).finally(() => setIsLoading(false));
    }, [isLoading]);

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return { stories, isLoading };
}

export function useGetOneStory(storyId) {
    const [story, setStory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const abortRef = useRef(null);

    useEffect(() => {
        abortRef.current = new AbortController();

        if (!isLoading) return;
        requester.get(`${baseUrl}/${storyId}`).then(setStory).finally(() => setIsLoading(false));
    }, [storyId, isLoading]);

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return { story, isLoading };
}