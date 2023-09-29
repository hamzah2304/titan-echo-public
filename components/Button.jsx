import styles from '../styles/Home.module.css'

const Button = ({id='', btnname, onClickCond, cond, red=false, muted=false}) => {
	return (
		<div id={id} className={`${styles.btn} ${(cond ? styles.btnClickable : styles.btnUnclickable)} ${(red ? styles.btnRed : "")} ${(muted ? styles.btnMuted : "")}`} onClick={()=>{
			if (cond) onClickCond();
		}}>
			<div className={styles.text}>{btnname}</div>
		</div>
	);
};

export default Button;