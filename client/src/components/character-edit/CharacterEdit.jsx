import styles from "./CharacterEdit.module.css";

export default function CharacterEdit() {

    function formActionHandler(formData) {
        console.log(formData);
    }

    return (
        <>
            <h2>Your character</h2>

            <form action={formActionHandler} className={styles["container"]}>
                <label htmlFor="characterName">Character Name</label>
                <input type="text" id="characterName" name="characterName" />

                <label htmlFor="role">Role</label>
                <input type="text" id="role" name="role" />

                <label htmlFor="image">Character Image</label>
                <input type="text" id="image" name="image" />

                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" name="description" />

                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}