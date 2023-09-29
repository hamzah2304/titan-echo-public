import styles from '/styles/Home.module.css';
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] });
import Image from 'next/image'

import StrategyName from 'components/StrategyName';
import Button from 'components/Button';
import { useAuth } from 'components/AuthContext';

import {postRemoveStrategy} from '../titanEchoAPI.js'

const RemoveStrategyPopUp = ({userStrategies,strategyPopupState,setInfo,setUserStrategiesUpdate}) => {
	
	let [strategyPopup,setStrategyPopup] = strategyPopupState;
	let { loggedIn, setLoggedIn, setNotLoggedInInfo } = useAuth();

    return (
		<div className={`${styles.funcpopup} ${strategyPopup.active ? styles.funcpopupactive : styles.funcpopupinactive}`}>
			<h3 className={montserrat.className}><span className={styles.semitransparent}>Delete Strategy&nbsp;:&nbsp;</span>{strategyPopup.active ? userStrategies[strategyPopup.stratId].name : ""}</h3>
			<Image
				className={styles.funccross}
				src="/cross.svg"
				alt="close popup"
				width={25}
				height={25}
				onClick={()=>{
					setStrategyPopup({active:false,stratId:0});
				}}
			/>
			<p>Are you sure you want to delete this strategy? This action will <strong>not</strong> remove any pending orders on this strategy. Go to your account on <a href="https://sx.bet">sx.bet</a> to remove pending orders.</p>
			<div className={`${styles.btnrow} ${styles.removestratbtnrow}`}>
				<Button btnname={"Cancel"} onClickCond={()=>{setStrategyPopup({active:false,stratId:0})}} cond={true}/>
				<Button btnname={"Delete"}  cond={true} red={true} onClickCond={()=>{
					setStrategyPopup({active:false,stratId:0});
					postRemoveStrategy(strategyPopup.stratId,(data)=>{
						if (data.auth==false){
							setNotLoggedInInfo('server');
							setLoggedIn(false);
						} else {
							if (data.success) {
								console.log('success remove strat');
								setUserStrategiesUpdate(Math.floor(Math.random() * 10000000000));
							}
							else {
								setInfo({title:'Oops',content:['Something went wrong.','Please try again.'],active:true});
							}
						}
					});
				}}/>
			</div>
		</div>
	);
}

export default RemoveStrategyPopUp