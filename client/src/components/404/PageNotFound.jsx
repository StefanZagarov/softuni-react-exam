import { Link } from "react-router";
import styles from "./PageNotFound.module.css";
export default function PageNotFound() {
  return (
    <div className={styles["container"]}>
      <p className={styles["status"]}>404</p>
      <p className={styles["text"]}>Nope, nothing here...</p>

      <Link to="/stories" className={styles["btn"]}>Go back</Link>
    </div>
  );
}