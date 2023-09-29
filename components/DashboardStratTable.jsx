import styles from '@/styles/Home.module.css'
import React, { useState,useEffect } from "react";
import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })
import Image from 'next/image'
import Button from 'components/Button'

import { getUserStrategies } from '../titanEchoAPI'
import { useAuth } from 'components/AuthContext';
import { startDate } from '../startdate'

const DashboardStratTable = ({userStrategiesState,infoState,strategyPopupState,userStrategiesUpdateState}) => {

	let [userStrategies,setUserStrategies] = userStrategiesState;
	let [info,setInfo] = infoState;
	let [strategyPopup,setStrategyPopup] = strategyPopupState;
	let { user, magic, loggedIn, magicLoaded, setNotLoggedInInfo, setLoggedIn } = useAuth();
	let [displayTable,setDisplayTable] = useState(false);
	let [userStrategiesUpdate,setUserStrategiesUpdate] = userStrategiesUpdateState;
	
	useEffect(() => {
		if (loggedIn){
			setDisplayTable(false);
			getUserStrategies(user.publicAddress,(data)=>{
				console.log(data)
				if (data.auth==false){
					console.log('not logged in')
					setNotLoggedInInfo('server');
					setLoggedIn(false);
				} else {
					setUserStrategies(data.data);
					setDisplayTable(true);
				}
			});
		}
	}, [loggedIn,userStrategiesUpdate]);

	if (displayTable){
		if (Object.keys(userStrategies).length>0){
			return (
				<div className={`${styles.card} ${styles.strategiesloaded} ${styles.transitionheight}`}>
					<div>
						<h3 className={`${montserrat.className} ${styles.light}`}><span className={styles.semitransparent}>Your active&nbsp;</span><span>Strategies</span></h3>
						<div className="markettable">
							<table className={montserrat.className}>
								<thead>
									<tr>
										<th>Strategy</th>
										<th>Notional</th>
										<th>Markets</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{Object.keys(userStrategies).map((stratId) => {
										let strat = userStrategies[stratId];
										let viewinfo = [
											<div className={styles.marketMaster} style={{display:'flex'}}>
												Notional:<p>&nbsp;${strat['notional']}</p>
											</div>,
											<div className={styles.marketMaster}>
												Titans:
												<div className={styles.marketGroup}>
													{strat['titans'].map((addr,index)=>{
														return (
															<span key={index}>&nbsp;&nbsp;<a target="_blank" href={"https://sx-sharks.xyz/bettor/"+addr}>{addr.substring(0,25)}</a>...&nbsp;&nbsp;</span>
														)
													})}
												</div>
											</div>,
											<div className={styles.marketMaster}>
												Markets:
												{Object.keys(strat['markets']).map((marketHash,index)=>{
													return (
														<div key={index} className={styles.marketGroup}>
															<p>&nbsp;&nbsp;Name: {strat['markets'][marketHash]['name']}</p>
															<p>&nbsp;&nbsp;Date: {startDate(strat['markets'][marketHash]['gameTime'])}</p>
															<p>&nbsp;&nbsp;Margin: {strat['markets'][marketHash]['margin']}%</p>
															<p>&nbsp;&nbsp;Shade: {strat['markets'][marketHash]['shade']}%</p>
														</div>
													)
												})}
											</div>,
											<div className={styles.marketMaster}>
												Orders:&nbsp;
												{strat['currentOrders'].length>0 ? (
													<div className={styles.marketGroup}>
														{strat['currentOrders'].map((orderHash,index)=>{
															return <p key={index}>&nbsp;&nbsp;{orderHash.substring(0,25)}...&nbsp;&nbsp;</p>
														})}
													</div>
												) : (
													<div className={styles.marketGroup}>
														<p>&nbsp;&nbsp;None</p>
												</div>
												)}
											</div>
										];
										return (
										<tr key={stratId}>
											<td>{userStrategies[stratId].name}</td>
											<td>${userStrategies[stratId].notional}</td>
											<td>{Object.keys(userStrategies[stratId].markets).length}</td>
											<td className="view" onClick={()=>{
												setInfo({title:userStrategies[stratId].name,content:viewinfo, active:true})
											}}>Preview</td>
											<td className="remove" onClick={()=>{
												setStrategyPopup({active:true,stratId:stratId})
											}}>Remove</td>
										</tr>
									)})}
								</tbody>
							</table>
						</div>
					</div>
					<div className={`${styles.btnrow} ${styles.newstratwrapper}`}>
						<Button btnname={"New Strategy"} cond={true} onClickCond={()=>{
						  window.location = '/strategy';
						}} />
					</div>
				</div>
			)
		}
		return (
			<div className={`${styles.card} ${styles.strategiesnotloaded} ${styles.transitionheight}`}>
				<h3 className={`${montserrat.className} ${styles.light}`}><span className={styles.semitransparent}>You have&nbsp;</span>no<span className={styles.semitransparent}>&nbsp;active&nbsp;</span>Strategies</h3>
				<div className={`${styles.btnrow} ${styles.newstratwrapper}`}>
					<Button btnname={"New Strategy"} cond={true} onClickCond={()=>{
					  window.location = '/strategy';
					}} />
				</div>
			</div>
		)
	}
	return (
		<div className={`${styles.card} ${styles.strategiesnotloaded} ${styles.transitionheight}`}>
			<h3 className={`${montserrat.className} ${styles.light}`}><span className={styles.semitransparent}>Loading Strategies...</span></h3>
		</div>
	)
};

export default DashboardStratTable;