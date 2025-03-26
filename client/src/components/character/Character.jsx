import { Link } from "react-router";
import styles from "./Character.module.css";

export default function Character() {
    return (
        <>
            <div className={styles["header-container"]}>
                <h2 className={styles["header"]}>Character</h2>
                <Link to="edit" className={styles["btn"]}> Edit </Link>
            </div>

            <div className={styles["container"]}>
                <main>
                    <img className={styles["img"]} src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/06/alma-from-monster-hunter-wilds.jpg" alt="" />
                </main>

                <aside className={styles["aside"]}>
                    <div>
                        <p className={styles["label"]}>Name</p>
                        <p className={styles["info"]}>Kan'tarr</p>
                    </div>

                    <div>
                        <p className={styles["label"]}>Role</p>
                        <p className={styles["info"]}>Battle Mage</p>
                    </div>

                    <div>
                        <p className={styles["label"]}>Species</p>
                        <p className={styles["info"]}>Hooman</p>
                    </div>

                    <div>
                        <p className={styles["label"]}>Alignment</p>
                        <p className={styles["info"]}>Lawful Good</p>
                    </div>
                </aside>
            </div>

            <div className={styles["description-container"]}>
                <p className={styles["label"]}>Description</p>
                <p className={styles["description"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quo sequi a corporis pariatur error necessitatibus sint et odit soluta consectetur quaerat sed, alias impedit. Recusandae facilis non quibusdam ab harum dolorum ut sunt, alias dolor vitae vel voluptate quis nemo, numquam aliquid dignissimos rerum autem ducimus illum placeat ratione. Nulla dolore culpa similique nesciunt magni quis iste, soluta adipisci ad. Aut, possimus perspiciatis ipsum a eligendi nulla accusamus nisi facilis sed, aperiam rerum blanditiis fugiat porro facere recusandae nam voluptate. Illo similique assumenda deleniti nihil ipsum ab. Beatae in enim quas alias sapiente ipsa dolor, fugiat explicabo mollitia ducimus?
                </p>
            </div>

        </>
    );
}