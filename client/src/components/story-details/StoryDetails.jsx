import { useParams } from 'react-router';
import styles from './StoryDetails.module.css';
import { useGetOneStory } from '../../api/storyApi';

export default function StoryDetails() {
    const { storyId } = useParams();
    const { _ownerId, image, title, story, _id } = useGetOneStory(storyId);

    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}>{title}</h2>
            <img className={styles["img"]} src={image} alt="" />
            <p className={styles["beers"]}>Beer tips: 999999</p>
            <div className={styles["title-border"]}></div>

            <div className={styles["story-text"]}>
                {story}
            </div>

            <button className={styles["beer-btn"]}>Tip a Beer</button>
        </div>
    );
}