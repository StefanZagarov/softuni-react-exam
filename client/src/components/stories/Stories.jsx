import styles from "./Stories.module.css";

import StoryItem from './story-item/StoryItem';

export default function Stories() {
    return (
        <>
            <h2 className={styles["header"]}>Stories</h2>

            <div className={styles["story-board"]}>
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
            </div>
        </>
    );
}