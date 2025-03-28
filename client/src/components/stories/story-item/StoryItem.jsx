import styles from './StoryItem.module.css';
import { Link } from "react-router";

export default function StoryItem() {
    return (
        <div className={styles["story-card"]}>

            <Link to="/story-details"><h2 className={styles["title"]}>Very long story name for the story card that goes for the max length of the story card</h2></Link>
            <div className={styles["title-border"]}></div>

            <img className={styles["img"]} src="/public/chw8yd858a681.webp" alt="" />

            <div className={styles["story-desc"]}>
                Story desc aaaaaaaaaaaaaaaaaaaaas dawsd aws daws dawsdawsdawsdawsd ;ajn dop;g jpeorgijsepdorgjpsoedr gjnps;oedri jgdfg nsdporif gjsdfogkjn sopedriuhj jon asdawsdwasda aswd awsdawsdasd awsd as dawsd awsdawsd awsd aws
            </div>
        </div>
    );
}