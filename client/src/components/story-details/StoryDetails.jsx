import { Link, useNavigate, useParams } from 'react-router';
import styles from './StoryDetails.module.css';
import { useDeleteStory, useGetOneStory } from '../../api/storyApi';
import { useGetStoryTips, useHasUserTipped, useTipStory } from '../../api/tipStoryApi';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import toast from 'react-hot-toast';

export default function StoryDetails() {
    const navigate = useNavigate();
    const { storyId } = useParams();
    const { story, isLoading } = useGetOneStory(storyId);
    const deleteStory = useDeleteStory();
    const { userId } = useAuth();
    const tipStory = useTipStory();
    const getStoryTips = useGetStoryTips();
    const [tips, setTips] = useState([]);
    const [isTipping, setIsTipping] = useState(false);

    const [hasTipped, setHasTipped] = useState(false);
    const hasUserTipped = useHasUserTipped();

    const isOwner = userId ? userId === story._ownerId : false;

    const errorToastOptions = {
        position: `top-right`,
        className: styles["toast"],

        style: {
            color: `#FFFFFF`,
            backgroundColor: `#E78F00`,
            border: `2px solid red`
        }
    };

    const successToastOptions = {
        position: `top-right`,
        className: styles["toast"],

        style: {
            color: `#FFFFFF`,
            backgroundColor: `#E78F00`,
            border: `2px solid green`
        }
    };

    useEffect(() => {

        hasUserTipped(userId, storyId).then(setHasTipped);
    }, [hasUserTipped, userId, storyId]);

    useEffect(() => {

        // Avoid infinite loop by checking if the old and new numbers are the same, in other words - if we have set it already
        getStoryTips(storyId).then(newTips => setTips(oldTips => oldTips !== newTips ? newTips : oldTips));

    }, [getStoryTips, tips, storyId]);

    async function handleTipBeer() {
        try {
            setIsTipping(true);

            await tipStory(storyId);

            // setTips(tips => tips + 1);
        } catch (error) {
            toast.error(`Failed to tip story`, errorToastOptions);
            console.log(`Failed to tip story:`, error);
        }
    }

    async function onDelete() {
        const hasConfirmed = confirm("Are you sure you want to delete this story?");

        if (!hasConfirmed) return;

        try {
            await deleteStory(storyId);
            toast.success(`Story deleted`, successToastOptions);
            navigate(`/stories`);
        } catch (error) {
            toast.error(`Could not delete story`, errorToastOptions);
            console.log(`Could not delete story:`, error);
        }
    }

    return (
        <>
            {isLoading ? <Spinner /> :
                <div className={styles["container"]}>
                    {isOwner &&
                        <div className={styles["owner-buttons"]}>
                            <Link to={`/stories/${story._id}/edit`} className={styles["edit-btn"]}>Edit Story</Link>
                            <button className={styles["delete-btn"]} onClick={onDelete}>Delete</button>
                        </div>}

                    <h2 className={styles["title"]}>{story.title}</h2>
                    <img className={styles["img"]} src={story.image ? story.image : "../../../public/chw8yd858a681.webp"} alt="" />
                    <div className={styles["story-info"]}>
                        <Link to={`/character/${story._ownerId}`} className={styles["created-by"]}> <span className={styles["author"]}>Author:</span> <span className={styles["user"]}>{story.username}</span></Link>
                        <p className={styles["beers"]}>Beer tips: {tips}</p>
                    </div>

                    <div className={styles["title-border"]}></div>

                    <div className={styles["story-text"]}>
                        {story.story}
                    </div>

                    {userId ? !isOwner &&
                        <div className={styles["beer-tips"]}>
                            {hasTipped ? <div className={styles["tipped"]}>Tipped!</div>
                                : <button className={styles["beer-btn"]}
                                    onClick={handleTipBeer}
                                    style={{ backgroundColor: isTipping ? `lightgray` : `` }}
                                    disabled={isTipping}>
                                    {isTipping ? `Tipping...` : `Tip Beer`}
                                </button>}
                        </div>
                        : <div className={styles["info"]}>Login to tip beer</div>}
                    <p className={styles["beers-footer"]}>Beer tips: {tips}</p>
                </div>
            }
        </>
    );

}
