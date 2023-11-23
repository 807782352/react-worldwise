import styles from "./index.module.css";

export default function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span>
      {message}
    </p>
  );
}
