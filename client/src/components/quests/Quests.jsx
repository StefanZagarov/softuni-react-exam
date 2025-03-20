import styles from "./Quests.module.css";

import QuestItem from './quest-item/QuestItem';

export default function Quests() {
    return (
        <>
            <h2 className={styles["header"]}>Quest board</h2>

            <div className={styles["quest-board"]}>
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
            </div>
        </>
    );
}