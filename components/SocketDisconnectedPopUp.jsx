import styles from '/styles/Home.module.css';
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] });
import Image from 'next/image'

import StrategyName from 'components/StrategyName';
import Button from 'components/Button';

const SocketDisconnectedPopUp = ({socketDisconnectedPopUp,setSocketDisconnectedPopUp}) => {
    return (
		<div className={`${styles.infopopup} ${socketDisconnectedPopUp ? styles.notloggedininfoactive : styles.notloggedininfoinactive}`}>
			<h3 className={montserrat.className}><span className={styles.semitransparent}>You've become</span> disconnected <span className={styles.semitransparent}>from the server!</span></h3>
			<Image
				className={styles.infocross}
				src="/cross.svg"
				alt="close popup"
				width={25}
				height={25}
				onClick={()=>{
					setSocketDisconnectedPopUp(false);
				}}
			/>
			<p>It is highly recommended that you return to the Home page and log-in. You can't echo titans as they place or cancel orders until you do. This is either because you have disconnected from the internet, the server is down or the server was not able to authenticate the reconnection attempt.</p>
			<div className={`${styles.btnrow}`}>
				<Button btnname={"Return to Home"} onClickCond={()=>{
					setSocketDisconnectedPopUp(false);
					window.location='/';
				}} cond={true} red={true}/>
			</div>
		</div>
	);
}

export default SocketDisconnectedPopUp