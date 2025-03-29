import { useNavigate, useParams } from "react-router";
import styles from "./StoryEdit.module.css";
import { useEditStory, useGetOneStory } from "../../api/storyApi";

export default function StoryEdit() {
    const navigate = useNavigate();
    const { storyId } = useParams();

    const { image, title, story, summary, _id } = useGetOneStory(storyId);
    const editStory = useEditStory();


    async function editActionHandler(formData) {
        const storyData = Object.fromEntries(formData);

        try {
            await editStory(storyId, storyData);

            navigate(`/stories/${storyId}/details`);
        } catch (error) {
            // TODO: Add toaster, check if the error is from the server or from the form requirements
            console.log(error);
        }
    }
    return (
        <>
            <h2 className={styles[`header`]}>Edit Story</h2>

            <form action={editActionHandler} className={styles["container"]}>

                <label htmlFor="image" className={styles["label"]}>Story Image</label>
                <input type="text" id="image" name="image" className={styles["input"]} placeholder="Give the audience the full picture" defaultValue={image} />

                <label htmlFor="title" className={styles["label"]}>Story Title</label>
                <input type="text" id="title" name="title" className={styles["input"]} placeholder="Name your story" defaultValue={title} />

                <label htmlFor="summary" className={styles["label"]}>Short Summary</label>
                <textarea type="text" id="summary" name="summary" className={styles["summary"]} placeholder="What is it about?" defaultValue={summary} />

                <label htmlFor="story" className={styles["label"]}>Story</label>
                <textarea type="text" id="story" name="story" className={styles["story"]} placeholder="Tell your story" defaultValue={story} />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}