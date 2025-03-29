const baseUrl = `http://localhost:3030/data/likes`;

import useAuth from "../hooks/useAuth";
import requester from "../utils/requester";

export function useTipStory() {
    const { request } = useAuth();
    async function tipStory(storyId) {
        try {
            const storyData = await request.post(`${baseUrl}`, { storyId });

            return storyData;

        } catch (error) {
            console.log(error);
        }
    }

    return tipStory;
}

export function useGetStoryTips() {
    async function getStoryTips(storyId) {
        const results = await requester.get(`${baseUrl}?where=storyId%3D%22${storyId}%22`);

        return results.length;
    }

    return getStoryTips;
}

export function useHasUserTipped() {
    async function hasUserTipped(userId, storyId) {
        const userTips = await requester.get(`http://localhost:3030/data/likes?where=_ownerId%3D%22${userId}%22`);

        const hasTipped = userTips.some(tip => tip.storyId === storyId);

        return hasTipped;
    }

    return hasUserTipped;
}