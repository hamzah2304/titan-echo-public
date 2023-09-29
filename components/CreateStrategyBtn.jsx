import styles from '../styles/Home.module.css'
import Button from 'components/Button'

import { useAuth } from 'components/AuthContext';

const CreateStrategyBtn = ({notional, savedMarkets, setStrategyPopup, minValue, maxValue, otherCond}) => {
	let { user, magic, loggedIn } = useAuth();
	if (loggedIn){
		return (
			<Button className={styles.floatright} btnname="Create Strategy" onClickCond={()=>{
			  setStrategyPopup({active:true});
			}} cond={notional.length>0 && otherCond && parseInt(notional)>=minValue && parseInt(notional)<=maxValue && maxValue!=null && maxValue>=minValue }/>
		);
	}
};

export default CreateStrategyBtn;