import styles from "../styles/Home.module.css";

const DashboardButton = () => {
  const handleClick = () => {
    window.location = "/dashboard";
  };

  return (
    <div
      className={`${styles.dashboardButton} ${styles.btn} ${styles.btnClickable} ${styles.btnMuted}`}
      onClick={handleClick}
    >
      <div className={styles.text}>Go to dashboard</div>
    </div>
  );
};

export default DashboardButton;
