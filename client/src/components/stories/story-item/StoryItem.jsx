import styles from './StoryItem.module.css';

export default function StoryItem() {
    return (
        <div className={styles["story-card"]}>

            <h2 className={styles["title"]}>Medium long story name for the story card asdasd asd asdasdasd asd asdasd</h2>
            <div className={styles["title-border"]}></div>

            <img className={styles["img"]} src="/public/chw8yd858a681.webp" alt="" />

            <div className={styles["story-desc"]}>
                Description: Story desc
            </div>
        </div>
    );
}