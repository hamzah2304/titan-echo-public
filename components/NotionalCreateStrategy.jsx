import styles from '@/styles/Home.module.css'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"

import { useAuth } from 'components/AuthContext';
import CurrencyInput from 'components/CurrencyInput'
import CreateStrategyBtn from 'components/CreateStrategyBtn'
import { useState,useEffect } from "react";

import { getUserCommittedNotional } from '../titanEchoAPI'

const NotionalCreateStrategy = ({notional, setNotional, savedMarkets, usdcBalanceState, setStrategyPopup, setInfo}) => {
	
  	let [usdcBalance,setUsdcBalance] = usdcBalanceState;

	let minNotionalValue = Math.max(25,25*Object.keys(savedMarkets).length);
	let otherCond = Object.keys(savedMarkets).length>0;

    const maxNotionalState = useState(null);
	let [maxNotional,setMaxNotional] = useState(null);
	let { user, loggedIn } = useAuth();

	useEffect(() => {
		console.log('socketAuth', loggedIn, usdcBalance)
		if (usdcBalance!=null && loggedIn){
			getUserCommittedNotional(user.publicAddress,(notionaldata)=>{
				if (notionaldata.success){
					let commitednotional = notionaldata.data;
					if (commitednotional < usdcBalance){
						let maxnotional = usdcBalance-commitednotional
						setMaxNotional(maxnotional);
						console.log('notionals',maxnotional,minNotionalValue)
						if (maxnotional < minNotionalValue){
							console.log('setINFO: Not enough funds')
							setInfo({title:'Not enough funds',content:['Your USDC balance is too low to be able to allocate any notional to this strategy. There is a minimum limit of $25 per market when creating new strategies. Your USDC balance is $'+usdcBalance+', and you have $'+commitednotional+' commited to other strategies: leaving $'+parseInt(maxnotional*100)/100+' remaining which is less than the minimum $'+minNotionalValue+' required for this strategy.'],active:true});
						}
					} else setMaxNotional(0);
				}
			});
		}
	}, [loggedIn, usdcBalance]);

	useEffect(() => {
		console.log('update!',usdcBalance,loggedIn,maxNotional,minNotionalValue)
		if (maxNotional!=null && usdcBalance!=null && loggedIn && maxNotional < minNotionalValue){
			console.log('setINFO: Not enough funds')
			setInfo({title:'Not enough funds',content:['Your USDC balance is too low to be able to allocate any notional to this strategy. There is a minimum limit of $25 per market when creating new strategies. Your USDC balance is $'+usdcBalance+', and you have $'+ (usdcBalance-maxNotional) +' commited to other strategies: leaving $'+parseInt(maxNotional*100)/100+' remaining which is less than the minimum $'+minNotionalValue+' required for this strategy.'],active:true});
		}
	},[Object.keys(savedMarkets).length]);

	return (
	<>
		<div className={styles.notionalwrapper}>
			<div className={`${montserrat.className} ${styles.subtitleunderline}`}>Notional</div>
			<CurrencyInput value={notional} setValue={setNotional} minValue={minNotionalValue} maxValue={maxNotional} otherCond={otherCond}/>
		</div>
		<div className={styles.createstrategywrapper}>
			<CreateStrategyBtn notional={notional} savedMarkets={savedMarkets} setStrategyPopup={setStrategyPopup} minValue={minNotionalValue} maxValue={maxNotional} otherCond={otherCond}/>
		</div>
	</>
	);
};

export default NotionalCreateStrategy;