import { useEffect } from "react";
import { useGetAllStories } from "../../api/storyApi";
import Spinner from "../spinner/Spinner";
import styles from "./Stories.module.css";
import StoryItem from './story-item/StoryItem';

export default function Stories() {
    const { stories, isLoading } = useGetAllStories();

    // Cleanup example
    useEffect(() => {
        console.log(`Mounting`);
        return () => {
            console.log(`Unmount cleanup`);
        };
    }, []);

    return (
        <>
            <h2 className={styles["header"]}>Stories</h2>

            <div className={styles["story-board"]}>
                {isLoading ? <Spinner /> : stories.length > 0 ? stories.map(story => <StoryItem key={story._id} {...story} />) : <h2>No stories have been told yet...</h2>}
            </div>
        </>
    );
}