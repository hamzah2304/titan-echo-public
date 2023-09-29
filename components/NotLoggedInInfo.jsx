import styles from '/styles/Home.module.css';
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] });
import Button from 'components/Button';

const NotLoggedInInfo = ({notLoggedInInfo,setNotLoggedInInfo}) => {
  return (
		<div className={`${styles.infopopup} ${notLoggedInInfo!='' ? styles.notloggedininfoactive : styles.notloggedininfoinactive}`}>
			<h3 className={montserrat.className}>{notLoggedInInfo=='client' ? "Requires you to be logged-in!" : "Requires you to be logged-in!"}</h3>
			<p>{notLoggedInInfo=='client' ? "Please return Home to log-in" : "Please return Home to log-in"}</p>
			<div className={styles.btnrow}>
				<Button btnname={"Return to Home"} onClickCond={()=>{
					setNotLoggedInInfo(false);
					window.location='/';
				}} cond={true} red={true}/>
			</div>
		</div>
  );
}

export default NotLoggedInInfo