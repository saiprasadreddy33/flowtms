import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.spinnerText}>Loading shipments...</div>
    </div>
  );
}
