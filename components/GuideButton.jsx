import styles from "../styles/Home.module.css";

const GuideButton = () => {
  const handleClick = () => {
    window.location = "/guide";
  };

  return (
    <div
      className={`${styles.dashboardButton} ${styles.btn} ${styles.btnClickable} ${styles.btnMuted}`}
      onClick={handleClick}
    >
      <div className={styles.text}>Quickstart guide</div>
    </div>
  );
};

export default GuideButton;
