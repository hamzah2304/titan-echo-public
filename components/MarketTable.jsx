import styles from '@/styles/Home.module.css'
import React, { useState,useEffect } from "react";
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })
import Image from 'next/image'

import { getMarketsGivenSports } from '../titanEchoAPI'
import { startDate } from '../startdate'

const MarketTable = ({sportsMap,sportsMapT,sports,leagues,marketsState,savedMarketsState,leaguesLoadedState,updateMarkets,allMarketsState,dropdown}) => {

	let [leaguesLoaded, setLeaguesLoaded] = leaguesLoadedState;
	let [markets,setMarkets] = marketsState;
	let [savedMarkets,setSavedMarkets] = savedMarketsState;
	let [allMarkets,setAllMarkets] = allMarketsState;
	
	{/* 
	let marketsLoadedState = useState(false);
	let [marketsLoaded,setMarketsLoaded] = marketsLoadedState; */}
	
	let sportBools = Object.keys(sports).map((sport)=>sports[sport][0]);
	
	useEffect(() => {
		if (leaguesLoaded){
			let sportIds = Object.keys(sports).filter((sport)=>sports[sport][0]).map((sport) => sportsMap[sport]);
			getMarketsGivenSports(sportIds,(data)=>{
				let currentUnixTimestamp = Math.floor(Date.now() / 1000); // get current Unix timestamp in seconds
				// && leagues[sportsMapT[market['sportId']]][market['leagueLabel']]
				let marketsOfLeagues = data['markets'].filter((market)=>{
					return (sportsMapT[market['sportId']] in leagues) && (market['leagueLabel'] in leagues[sportsMapT[market['sportId']]]) && (market['gameTime'] >= currentUnixTimestamp);
				});
				setAllMarkets(marketsOfLeagues);
			});
		}
	}, [leaguesLoaded].concat(sportBools));	

	useEffect(() => {
		if (leaguesLoaded){
			updateMarkets(allMarkets);
		}
	},[allMarkets,leagues]);
	
	function toggleSelected(hash) {
		return ()=>{
			if (markets[hash].selected){
				delete savedMarkets[hash];
			} else {
				savedMarkets[hash] = {outcomeOneName:markets[hash].outcomeOneName,outcomeTwoName:markets[hash].outcomeTwoName,margin:5,shade:0,gameTime:markets[hash].gameTime}
			}
			setSavedMarkets(savedMarkets);
			setMarkets(prevMarkets => ({
					...prevMarkets,
					[hash]: {
							...prevMarkets[hash],
							selected: !markets[hash].selected
					}
			}));
		}
	}
	
    return (
		<div className="markettable">
			{/* {leaguesLoaded} */}
			  <table className={montserrat.className}>
					<thead>
						<tr>
							<th>Select</th>
							<th>Time</th>
							<th>Sport</th>
							<th>League</th>
							<th>Market</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(markets).map((marketHash,index) => (
							<tr key={index}>
								<td onClick={toggleSelected(marketHash)} className={"selected-"+markets[marketHash].selected.toString()}>
									<Image
										className="selected-checked"
										src="/checked-box.svg"
										alt="checked"
										width={25}
										height={25}
										priority
									/>
									<Image
										className="selected-unchecked"
										src="/unchecked-box.svg"
										alt="unchecked"
										width={25}
										height={25}
										priority
									/>
								</td>
								<td style={{whiteSpace: "nowrap"}}>{startDate(markets[marketHash].gameTime)}</td>
								<td>{markets[marketHash].sport}</td>
								<td>{markets[marketHash].league}</td>
								<td>{markets[marketHash].outcomeOneName} vs {markets[marketHash].outcomeTwoName}</td>
							</tr>
						))}
					</tbody>
			  </table>

		</div>
	)
};

export default MarketTable