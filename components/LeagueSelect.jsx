import React from 'react'
import styles from '@/styles/Home.module.css'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"
import MarketSelectLeague from 'components/MarketSelectLeague'
import { useEffect } from "react";

import { getAllLeagues } from '../titanEchoAPI'

const LeagueSelect = ({sportsMapT,sports,leaguesState,leaguesLoadedState}) => {
	
	let [leagues, setLeagues] = leaguesState;
	let [leaguesLoaded, setLeaguesLoaded] = leaguesLoadedState;
	
	useEffect(() => {
		getAllLeagues((data)=>{
			let templeagues = {}
			data.forEach((leaguerow)=>{
				let thissport = sportsMapT[leaguerow['sportId']];
				if (leaguerow['sportId']<10 || leaguerow['sportId']==12){
					if (thissport in templeagues){
						// set to false
						templeagues[thissport][leaguerow['label']] = false;
					} else {
						templeagues[thissport] = {}
						templeagues[thissport][leaguerow['label']] = true;
					}
				}
			});
			setLeagues(templeagues);
			setLeaguesLoaded(true);
		});
	}, []);
	
	return (
		<div>
		{Object.keys(sports).length && Object.keys(sports).map((sport,index) => {
			if (sports[sport][0] && leagues[sport]) {
			  if (Object.keys(leagues[sport]).length>0){
				return (
				  <div key={index} className={`${styles.taglist} ${styles.sidetaglist}`}>
					<p className={styles.description}>{sport}</p>
					{Object.keys(leagues[sport]).map((league,index) => {
					  if (Object.keys(leagues[sport]).length>0){
						return <MarketSelectLeague key={index} sport={sport} league={league} leaguesState={leaguesState}/>
					  }
					})}
				  </div>
				)
			  }
			}
		})}
		</div>
	);
};

export default LeagueSelect