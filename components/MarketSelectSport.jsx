import styles from '@/styles/Home.module.css'

const MarketSelectSport = ({sport, selected, setSelected}) => {
	return (
		<div className={`${styles.tags} ${styles.marketmakeraddr} ${(selected ? styles.tagselected : styles.tagnotselected)} ${styles.description}`} onClick={
			()=>{
				setSelected(!selected);
			}
		}>
			<p>{sport}</p>
			<img className={styles.tagcross} src="/cross.svg"/>
		</div>
	);
};

export default MarketSelectSport;