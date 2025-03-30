import styles from "./CharacterCreate.module.css";
import { useCreateCharacter } from "../../api/characterApi";

export default function CharacterCreate({ setCharacter }) {
    const createCharacter = useCreateCharacter();

    async function createCharacterFormHandler(formData) {
        const characterData = Object.fromEntries(formData);
        const fullCharacterData = { ...characterData };

        const characterResult = await createCharacter(fullCharacterData);

        setCharacter(characterResult);
    }

    // TODO: Use optimistic approach

    return (
        <>
            <h2 className={styles[`header`]}>Seems like you haven't introduced yourself yet</h2>

            <form action={createCharacterFormHandler} className={styles["container"]}>
                <label className={styles['label']} htmlFor="image">Character Image</label>
                <input className={styles['input']} type="text" id="image" name="image" />

                <label className={styles['label']} htmlFor="name">Character Name</label>
                <input className={styles['input']} type="text" id="name" name="name" />

                <label className={styles['label']} htmlFor="role">Role</label>
                <input className={styles['input']} type="text" id="role" name="role" />

                <label className={styles['label']} htmlFor="species">Species</label>
                <input className={styles['input']} type="text" id="species" name="species" />

                <label className={styles['label']} htmlFor="alignment">Alignment</label>
                <input className={styles['input']} type="text" id="alignment" name="alignment" />

                <label className={styles['label']} htmlFor="description">Description</label>
                <textarea className={styles['description']} type="text" id="description" name="description" />

                <button className={styles["btn"]}>Create</button>
            </form>
        </>
    );
}