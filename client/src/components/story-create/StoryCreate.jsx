import { useCreateStory } from "../../api/storyApi";
import styles from "./StoryCreate.module.css";
import { useNavigate } from "react-router";

export default function StoryCreate() {
    const navigate = useNavigate();
    const createStory = useCreateStory();

    async function formActionHandler(formData) {
        const storyData = Object.fromEntries(formData);

        try {
            await createStory(storyData);

            navigate(`/catalog`);
        } catch (error) {
            // TODO: Add toaster, check if the error is from the server or from the form requirements
            console.log(error);
        }
    }
    return (
        <>
            <h2 className={styles[`header`]}>Create a Story</h2>

            <form action={formActionHandler} className={styles["container"]}>

                <label htmlFor="image" className={styles["label"]}>Story Image</label>
                <input type="text" id="image" name="image" className={styles["input"]} placeholder="Give the audience the full picture" />

                <label htmlFor="title" className={styles["label"]}>Story Title</label>
                <input type="text" id="title" name="title" className={styles["input"]} placeholder="Name your story" />

                <label htmlFor="summary" className={styles["label"]}>Short Summary</label>
                <textarea type="text" id="summary" name="summary" className={styles["summary"]} placeholder="What is it about?" />

                <label htmlFor="story" className={styles["label"]}>Story</label>
                <textarea type="text" id="story" name="story" className={styles["story"]} placeholder="Tell your story" />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}