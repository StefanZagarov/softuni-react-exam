import styles from "./About.module.css";

export default function About() {
    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}>Welcome to <span className={styles["logo"]}>The Drunken Dragon</span>!</h2>
            <p className={styles["description"]}>You have reached a virtual haven where digital wanderers gather to share their stories of heroism, misdeeds, and anything between. Step into our cozy cyber-haven with your avatar, and join a lively community of internet travelers. Here, every tale matters: whether you’re recounting epic journeys, humorous mishaps, or quiet moments of insight, your voice finds a home among kindred spirits. Pull up a chair at our virtual table, raise a digital toast, and let the magic of shared experiences carry you through a world where every story is celebrated with a good beer!
            </p>
        </div>
    );
}