import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })
import styles from '@/styles/Home.module.css'

import React, { useState } from "react";

class StrategyBox extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className={styles.card}>
		  	<h3 className={`${montserrat.className} ${styles.light}`}>{this.props.num}.&nbsp;&nbsp;<span className={styles.semitransparent}>{this.props.titlepre}&nbsp;</span><span>{this.props.titlemain}</span><span className={styles.semitransparent}>&nbsp;{this.props.titlepost}</span></h3>
		  	{this.props.children}
			</div>
		);
	}
};

export default StrategyBox;