import styles from '/styles/Home.module.css';
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] });
import Image from 'next/image'

const InfoPopUp = ({info,setInfo}) => {
  return (
	<div className={`${styles.infopopup} ${info.active ? styles.infoactive : styles.infoinactive}`}>
		<h3 className={montserrat.className}>{info.title}</h3>
		<Image
			className={styles.infocross}
			src="/cross.svg"
			alt="close popup"
			width={25}
			height={25}
			onClick={()=>{setInfo({title:"",content:[],active:false})}}
		/>
		{info.content.map((para,index)=>{
			return (<div className={styles.infoline} key={index}>{para}</div>)
		})}
	</div>
  );
}

export default InfoPopUp