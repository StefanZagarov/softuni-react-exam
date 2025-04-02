const baseUrl = `http://localhost:3030/data/likes`;

import { useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import requester from "../utils/requester";

export function useTipStory() {
    const { request } = useAuth();
    const abortRef = useRef(null);

    async function tipStory(storyId) {
        try {
            if (abortRef.current) {
                abortRef.current.abort();
                return;
            }
            abortRef.current = new AbortController();

            const storyData = await request.post(`${baseUrl}`, { storyId }, { signal: abortRef.current.signal });

            return storyData;

        } catch (error) {
            console.log(`Failed to tip story:`, error);
        }
    }

    return tipStory;
}

export function useGetStoryTips() {
    const abortRef = useRef(null);

    async function getStoryTips(storyId) {
        abortRef.current = new AbortController();

        const results = await requester.get(`${baseUrl}?where=storyId%3D%22${storyId}%22`);

        return results.length;
    }

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return getStoryTips;
}

export function useHasUserTipped() {
    const abortRef = useRef(null);

    async function hasUserTipped(userId, storyId) {
        abortRef.current = new AbortController();
        const userTips = await requester.get(`http://localhost:3030/data/likes?where=_ownerId%3D%22${userId}%22`);

        const hasTipped = userTips.some(tip => tip.storyId === storyId);

        return hasTipped;
    }

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return hasUserTipped;
}