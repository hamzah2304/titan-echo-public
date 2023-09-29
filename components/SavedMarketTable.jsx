import { Dropdown } from 'semantic-ui-react'
import styles from '@/styles/Home.module.css'
import React, { useState,useEffect } from "react";
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })
import Image from 'next/image'

//sportdropdown,leaguedropdown
const SavedMarketTable = ({marketsState,savedMarketsState,currentEditMarket,setCurrentEditMarket,setIsEditMarket}) => {

	let [markets,setMarkets] = marketsState;
	let [savedMarkets,setSavedMarkets] = savedMarketsState;
	
	function removeSavedMarket(hash) {
		return ()=>{
			if (hash in markets){
				setMarkets(prevMarkets => ({
					...prevMarkets,
					[hash]: {
							...prevMarkets[hash],
							selected: false
					}
				}));
			}
			if (hash == currentEditMarket){
				setIsEditMarket(false);
			}
			delete savedMarkets[hash];
			setSavedMarkets(savedMarkets);
		}
	}
	
	function editSavedMarket(hash){
		return () => {
			setCurrentEditMarket(hash);
			setIsEditMarket(true);
		}
	}
	
    return (
		<div className="markettable">
			  <table className={montserrat.className}>
					<thead>
						<tr>
							<th>Market</th>
							<th>Margin</th>
							<th>Shade</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(savedMarkets).map((marketHash,index) => (
							<tr key={index}>
								<td>{savedMarkets[marketHash].outcomeOneName} vs {savedMarkets[marketHash].outcomeTwoName}</td>
								<td>{savedMarkets[marketHash].margin}%</td>
								<td>{savedMarkets[marketHash].shade}</td>
								<td className="edit" onClick={editSavedMarket(marketHash)}>Edit</td>
								<td className="remove" onClick={removeSavedMarket(marketHash)}>Remove</td>
							</tr>
						))}
					</tbody>
			  </table>

		</div>
	)
};

export default SavedMarketTable