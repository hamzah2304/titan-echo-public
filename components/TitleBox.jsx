import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })
import styles from '/styles/Home.module.css'

import React, { useState } from "react";

class TitleBox extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className={`${montserrat.className} ${styles.titlebox}`} style={{textAlign: "center"}}>
		  	    <h2 className={`${montserrat.className} ${styles.light}`}>
                    <span className={styles.semitransparent}>{this.props.titlepre}&nbsp;</span>
					{this.props.titlemain.map((titleline,i)=>{
						if (i>0) return (<><br/><span key={i}>{titleline}</span></>)
						else return (<span key={i}>{titleline}</span>)
						
					})}
                    <span className={styles.semitransparent}>&nbsp;{this.props.titlepost}</span>
                </h2>
		  	    {this.props.children}
			</div>
		);
	}
};

export default TitleBox;