import styles from './StoryItem.module.css';
import { Link } from "react-router";

export default function StoryItem({ _id, image, title, summary, username, _ownerId }) {
    return (
        <div className={styles["story-card"]}>

            <Link to={`/stories/${_id}/details`}><h2 className={styles["title"]}>{title}</h2></Link>
            <div className={styles["title-border"]}></div>

            <img className={styles["img"]} src={image ? image : "../../../../public/chw8yd858a681.webp"} alt="" />

            <div className={styles["story-desc"]}>
                {summary}
            </div>
            <Link to={`/character/${_ownerId}`} className={styles["created-by"]}> <span className={styles["author"]}>Author:</span><span className={styles["user"]}>{username}</span> </Link>
        </div>
    );
}