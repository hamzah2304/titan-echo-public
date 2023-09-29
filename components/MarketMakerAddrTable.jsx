import styles from '@/styles/Home.module.css'
import React, { useState,useEffect } from "react";
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })
import Image from 'next/image'

const MarketMakerAddrTable = ({titans,setTitans,expertise}) => {
	return (
		<div className="titanstable">
			{/* {leaguesLoaded} */}
			  <table className={montserrat.className}>
					<thead>
						<tr>
							<th>Select</th>
							<th>Expertise</th>
							<th>Public Address</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(titans).map((titanAddr,index) => (
							<tr key={index}>
								<td onClick={()=>{
									setTitans(prevTitans => ({
										...prevTitans,
										[titanAddr]: !prevTitans[titanAddr]
									}));
								}} className={"selected-"+titans[titanAddr].toString()}>
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
								<td>
									<p>{titanAddr in expertise ? expertise[titanAddr] : 'All'}</p>
								</td>
								<td>
									<p className={(titans[titanAddr] ? styles.addrselected : styles.addrnotselected)}>{titanAddr.substring(0,30)}...</p>
								</td>
								<td>
									<a className={styles.sxSharksLink} href={"https://sx-sharks.xyz/bettor/"+titanAddr} target="_blank">SX Sharks</a>
									</td>
							</tr>
						))}
					</tbody>
			  </table>

		</div>
	)
};

export default MarketMakerAddrTable