import { useEffect, useState } from 'react';
import styles from './StoryItem.module.css';
import { Link } from "react-router";
import { useGetStoryTips } from '../../../api/tipStoryApi';
import CardSpinner from '../../spinner/card-spinner/CardSpinner';

export default function StoryItem({ _id, image, title, summary, username, _ownerId }) {
    const [tips, setTips] = useState([]);
    const getStoryTips = useGetStoryTips();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Avoid infinite loop by checking if the old and new numbers are the same, in other words - if we have set it already
        getStoryTips(_id).then(newTips => setTips(oldTips => oldTips !== newTips ? newTips : oldTips)).finally(setIsLoading);
    }, [getStoryTips, tips, _id]);

    return (
        <>
            <div className={styles["story-card"]}>

                <Link to={`/stories/${_id}/details`}><h2 className={styles["title"]}>{title}</h2></Link>
                <div className={styles["title-border"]}></div>

                <img className={styles["img"]} src={image ? image : "../../../../public/chw8yd858a681.webp"} alt="" />

                <div className={styles["story-desc"]}>
                    {summary}
                </div>

                <div className={styles["footer"]}>
                    <Link to={`/character/${_ownerId}`} className={styles["created-by"]}> <span className={styles["author"]}>Author:</span><span className={styles["user"]}>{username}</span> </Link>

                    {isLoading ? <CardSpinner className={styles["test"]} />
                        : <p>Beers: {tips}</p>
                    }
                </div>
            </div>
        </>
    );
}