import styles from "./CharacterEdit.module.css";
import { useNavigate } from "react-router";

export default function CharacterEdit() {
    const navigate = useNavigate();

    function formActionHandler(formData) {

        // navigate(`/character`);
    }

    // TODO: Use optimistic approach

    return (
        <>
            <h2 className={styles[`header`]}>Edit Character</h2>

            <form action={formActionHandler} className={styles["container"]}>
                <label className={styles['label']} htmlFor="characterName">Character Name</label>
                <input className={styles['input']} type="text" id="characterName" name="characterName" />

                <label className={styles['label']} htmlFor="image">Character Image</label>
                <input className={styles['input']} type="text" id="image" name="image" />

                <label className={styles['label']} htmlFor="role">Role</label>
                <input className={styles['input']} type="text" id="role" name="role" />

                <label className={styles['label']} htmlFor="species">Species</label>
                <input className={styles['input']} type="text" id="species" name="species" />

                <label className={styles['label']} htmlFor="alignment">Alignment</label>
                <input className={styles['input']} type="text" id="alignment" name="alignment" />

                <label className={styles['label']} htmlFor="description">Description</label>
                <textarea className={styles['description']} type="text" id="description" name="description" />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}