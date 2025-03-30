import styles from './StoryItem.module.css';
import { Link } from "react-router";

export default function StoryItem({ _id, image, title, summary, username }) {
    return (
        <div className={styles["story-card"]}>

            <Link to={`/stories/${_id}/details`}><h2 className={styles["title"]}>{title}</h2></Link>
            <div className={styles["title-border"]}></div>

            <img className={styles["img"]} src={image} alt="" />

            <div className={styles["story-desc"]}>
                {summary}
            </div>
            <div className={styles["created-by"]}> <span className={styles["author"]}>Author:</span> {username}</div>
        </div>
    );
}