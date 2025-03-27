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
                <label htmlFor="title" className={styles["label"]}>Story Title</label>
                <input type="text" id="title" name="title" className={styles["title"]} />

                <label htmlFor="description" className={styles["label"]}>Description</label>
                <textarea type="text" id="description" name="description" className={styles["description"]} />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}