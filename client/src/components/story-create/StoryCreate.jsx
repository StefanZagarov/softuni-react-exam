import styles from "./StoryCreate.module.css";
import { useNavigate } from "react-router";

export default function StoryCreate() {
    const navigate = useNavigate();

    function formActionHandler(formData) {
        console.log(formData);

        navigate(`/catalog`);
    }
    return (
        <>
            <h2 className={styles[`header`]}>Create a Story</h2>

            <form action={formActionHandler} className={styles["container"]}>
                <label htmlFor="story-title" className={styles["label"]}>Story Title</label>
                <input type="text" id="characterName" name="characterName" className={styles["character-name"]} />

                <label htmlFor="description" className={styles["label"]}>Description</label>
                <textarea type="text" id="description" name="description" className={styles["description"]} />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}