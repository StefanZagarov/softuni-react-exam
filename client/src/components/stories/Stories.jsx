import { useGetAllStories } from "../../api/storyApi";
import styles from "./Stories.module.css";
import StoryItem from './story-item/StoryItem';

export default function Stories() {
    const stories = useGetAllStories();

    return (
        <>
            <h2 className={styles["header"]}>Stories</h2>

            <div className={styles["story-board"]}>
                {stories.length > 0 ? stories.map(story => <StoryItem key={story._id} {...story} />) : <h2>No stories have been told yet...</h2>}
            </div>
        </>
    );
}