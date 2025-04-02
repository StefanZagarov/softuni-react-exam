import styles from "./Character.module.css";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useGetCharacter } from "../../api/characterApi";

import CharacterCreate from "../character-create/CharacterCreate";
import CharacterEdit from "./character-edit/CharacterEdit";
import Spinner from "../spinner/Spinner";
import { useParams } from "react-router";

export default function Character() {
    const { userId: paramUserId } = useParams();
    const { userId } = useAuth();
    const getCharacter = useGetCharacter();
    const [character, setCharacter] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const searchId = paramUserId ? paramUserId : userId;
    const isOwner = !!userId === character._ownerId;

    useEffect(() => {
        getCharacter(searchId)
            .then(character => character ? setCharacter(character) : false)
            .finally(() => setIsLoading(false));
    }, [getCharacter, searchId]);

    function updateCharacter(characterDataResult) {
        setCharacter(characterDataResult);
        toggleEdit();
    }

    function toggleEdit() {
        setEditMode(oldState => !oldState);
    }

    return (
        <>
            {
                isLoading ? <Spinner /> :
                    editMode ? <CharacterEdit characterId={character._id} character={character} updateCharacter={updateCharacter} />
                        :
                        character ?
                            <>
                                <div className={styles["header-container"]}>
                                    <h2 className={styles["header"]}>Character</h2>
                                    {isOwner && <button className={styles["edit-btn"]} onClick={toggleEdit}> Edit </button>}
                                </div>

                                <div className={styles["character-container"]}>
                                    <main className={styles["main"]}>
                                        <img className={styles["img"]} src={character.image ? character.image : null} alt="" />
                                    </main>

                                    <aside className={styles["aside"]}>
                                        <div>
                                            <p className={styles["label"]}>Name</p>
                                            <p className={styles["info"]}>{character.name}</p>
                                        </div>

                                        <div>
                                            <p className={styles["label"]}>Role</p>
                                            <p className={styles["info"]}>{character.role}</p>
                                        </div>

                                        <div>
                                            <p className={styles["label"]}>Species</p>
                                            <p className={styles["info"]}>{character.species}</p>
                                        </div>

                                        <div>
                                            <p className={styles["label"]}>Alignment</p>
                                            <p className={styles["info"]}>{character.alignment}</p>
                                        </div>
                                    </aside>
                                </div>

                                <div className={styles["description-container"]}>
                                    <p className={styles["label"]}>Description</p>
                                    <p className={styles["description"]}>{character.description}</p>
                                </div>
                            </>
                            :
                            isOwner ? <CharacterCreate setCharacter={setCharacter} /> : <p className={styles["no-character"]}>They haven't introduced themselves yet...</p>
            }
        </>
    );
}