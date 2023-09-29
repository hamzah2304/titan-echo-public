import styles from '@/styles/Home.module.css'

const MarketSelectLeague = ({sport, league, leaguesState}) => {
	let [leagues, setLeagues] = leaguesState;
	return (
		<div key={league} className={`${styles.tags} ${styles.marketmakeraddr} ${(leagues[sport][league] ? styles.tagselected : styles.tagnotselected)} ${styles.description}`} onClick={
			()=>{
				setLeagues(prevLeagues => ({
					...prevLeagues,
					[sport]: {
							...prevLeagues[sport],
							[league]: !prevLeagues[sport][league]
					}
				}));
			}
		}>
		 <p>{league}</p>
		 	<img className={styles.tagcross} src="/cross.svg"/>
		</div>
	);
};

export default MarketSelectLeague;