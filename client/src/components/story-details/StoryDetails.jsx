import { Link, useNavigate, useParams } from 'react-router';
import styles from './StoryDetails.module.css';
import { useDeleteStory, useGetOneStory } from '../../api/storyApi';
import { useGetStoryTips, useHasUserTipped, useTipStory } from '../../api/tipStoryApi';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

export default function StoryDetails() {
    const navigate = useNavigate();
    const { storyId } = useParams();
    const { _ownerId, image, title, story, _id } = useGetOneStory(storyId);
    const deleteStory = useDeleteStory();
    const { userId } = useAuth();
    const tipStory = useTipStory();
    const getStoryTips = useGetStoryTips();
    const [tips, setTips] = useState([]);

    const [hasTipped, setHasTipped] = useState(false);
    const hasUserTipped = useHasUserTipped();

    const isOwner = userId ? userId === _ownerId : false;

    useEffect(() => {
        hasUserTipped(userId, storyId).then(setHasTipped);
    }, [hasUserTipped, userId, storyId]);

    useEffect(() => {
        // Avoid infinite loop by checking if the old and new numbers are the same, in other words - if we have set it already
        getStoryTips(storyId).then(newTips => setTips(oldTips => oldTips !== newTips ? newTips : oldTips));

    }, [getStoryTips, tips, storyId]);

    async function onTipBeer() {
        try {
            // Optimistic update (current logic does not require useOptimistic)
            // setTips(prevTips => prevTips + 1);

            await tipStory(storyId);

            setTips(tips => tips + 1);
        } catch (error) {
            console.log(`Failed to tip story:`, error);
        }
    }

    async function onDelete() {
        await deleteStory(storyId);

        navigate(`/stories`);
    }

    return (
        <div className={styles["container"]}>
            {isOwner &&
                <div className={styles["owner-buttons"]}>
                    <Link to={`/stories/${_id}/edit`} className={styles["edit-btn"]}>Edit Story</Link>
                    <button className={styles["delete-btn"]} onClick={onDelete}>Delete</button>
                </div>}

            <h2 className={styles["title"]}>{title}</h2>
            <img className={styles["img"]} src={image} alt="" />
            <p className={styles["beers"]}>Beer tips: {tips}</p>
            <div className={styles["title-border"]}></div>

            <div className={styles["story-text"]}>
                {story}
            </div>

            {userId ? !isOwner &&
                <div className={styles["beer-tips"]}>
                    {hasTipped ? <dvi className={styles["tipped"]}>Tipped!</dvi> : <button className={styles["beer-btn"]} onClick={onTipBeer}>Tip Beer</button>}

                </div>
                : <div className={styles["info"]}>Login to tip beer</div>}
            <p className={styles["beers-footer"]}>Beer tips: {tips}</p>
        </div>
    );
}
