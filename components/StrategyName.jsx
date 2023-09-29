import styles from '../styles/Home.module.css'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"
import { useState } from "react";

const StrategyName = ({strategyName, setStrategyName}) => {
	return (
		<div className={`${styles.addaddrwrapper} ${styles.stratnamewrapper}`}>
		  <div className={`${montserrat.className} ${styles.subtitleunderline}`}>Strategy Name</div>
		  <div>
			<input
			  name="name-input"
			  placeholder="Strategy Name"
			  value={strategyName}
			  onInput={(e) => setStrategyName(e.target.value)}
			/>
		  </div>
		</div>
	);
};

export default StrategyName;