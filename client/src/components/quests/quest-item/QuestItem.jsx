import styles from './QuestItem.module.css';

export default function Component() {
    return (
        <div className={styles["quest-card"]}>

            <h2 className={styles["title"]}>Medium long quest for the quest card asdasd asd asdasdasd asd asdasd</h2>
            <div className={styles["title-border"]}></div>

            <img src="/public/chw8yd858a681.webp" alt="" />

            <div className={styles["quest-theme"]}>
                Description: Quiz thematic
            </div>

            <div className={styles["quest-timer"]}>
                Time: The time limit of the quiz
            </div>
        </div>
    );
}