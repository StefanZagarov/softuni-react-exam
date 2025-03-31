import { useEditCharacter } from "../../api/characterApi";
import styles from "./CharacterEdit.module.css";

export default function CharacterEdit({ characterId, character, updateCharacter }) {

  const editCharacter = useEditCharacter();

  async function handleCharacterEdit(formData) {
    const characterData = Object.fromEntries(formData);

    try {
      const characterDataResult = await editCharacter(characterId, characterData);

      updateCharacter(characterDataResult);
    } catch (error) {
      console.log(`Failed to edit character:`, error);
    }
  }

  return (
    <>
      <div className={styles["header-container"]}>
        <h2 className={styles["header"]}>Edit Character</h2>
        <button form="char-edit-form" className={styles["edit-btn"]}> Finish Edit </button>
      </div>

      <form id="char-edit-form" action={handleCharacterEdit} className={styles["container"]}>
        <div></div>
        <main className={styles["main"]}>
          <img className={styles["img"]} src={character.image} alt="" />
          <label className={styles["label"]} htmlFor="image" >Character Image</label>
          <input className={styles["image-input"]} name="image" id="image" defaultValue={character.image}></input>
        </main>

        <aside className={styles["aside"]}>
          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="name">Name</label>
            <input className={styles["input"]} name="name" id="name" defaultValue={character.name}></input>
          </div>

          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="role">Role</label>
            <input className={styles["input"]} name="role" id="role" defaultValue={character.role}></input>
          </div>

          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="species">Species</label>
            <input className={styles["input"]} name="species" id="species" defaultValue={character.species}></input>
          </div>

          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="alignment">Alignment</label>
            <input className={styles["input"]} name="alignment" id="alignment" defaultValue={character.alignment}></input>
          </div>

          <div className={styles["description-container"]}>
            <label className={styles["label"]} htmlFor="description">Description</label>
            <textarea className={styles["description"]} name="description" id="description" defaultValue={character.description}></textarea>
          </div>
        </aside>
      </form>
    </>
  );
}