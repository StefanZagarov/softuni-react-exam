import { Link } from "react-router";
import styles from "./Character.module.css";
import useAuth from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useGetCharacter } from "../../api/characterApi";

import CharacterCreate from "../character-create/CharacterCreate";

export default function Character() {
    const { userId } = useAuth();
    const getCharacter = useGetCharacter();
    const [character, setCharacter] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getCharacter(userId).then(character => character.length > 0 ? setCharacter(character) : false);
    }, [getCharacter, userId]);

    return (
        <>
            {
                character ?
                    <>
                        <div className={styles["header-container"]}>
                            <h2 className={styles["header"]}>Character</h2>
                            <Link to={`/character/${userId}/edit`} className={styles["edit-btn"]}> Edit </Link>
                        </div>

                        <div className={styles["container"]}>
                            <main>
                                <img className={styles["img"]} src={null} alt="" />
                            </main>

                            <aside className={styles["aside"]}>
                                <div>
                                    <p className={styles["label"]}>Name</p>
                                    <p className={styles["info"]}>{ }</p>
                                </div>

                                <div>
                                    <p className={styles["label"]}>Role</p>
                                    <p className={styles["info"]}></p>
                                </div>

                                <div>
                                    <p className={styles["label"]}>Species</p>
                                    <p className={styles["info"]}></p>
                                </div>

                                <div>
                                    <p className={styles["label"]}>Alignment</p>
                                    <p className={styles["info"]}></p>
                                </div>
                            </aside>
                        </div>

                        <div className={styles["description-container"]}>
                            <p className={styles["label"]}>Description</p>
                            <p className={styles["description"]}>
                            </p>
                        </div>
                    </>
                    : <CharacterCreate setCharacter={setCharacter} />
            }
        </>
    );
}