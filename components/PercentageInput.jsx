import styles from '@/styles/Home.module.css'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"

const PercentageInput = ({hash, savedMarketsState}) => {
	
	let [savedMarkets,setSavedMarkets] = savedMarketsState;

	const keyPressHanlder = (event) => {
		const { key } = event;
		setSavedMarkets((prevMarkets) => ({
			...prevMarkets,
			[hash]: {
				...prevMarkets[hash],
				margin: Math.max(0,Math.min(99, key !== "Backspace"
					? !Number.isNaN(parseInt(key))
					  ? parseInt(prevMarkets[hash]["margin"] + key)
					  : prevMarkets[hash]["margin"]
					: parseInt((prevMarkets[hash]["margin"].toString().length>1) ? (prevMarkets[hash]["margin"].toString()).substring(0, (prevMarkets[hash]["margin"].toString()).length - 1) : "0")))
			}
		}));
	};
	 
	function percentageFormat(num) {
	   return Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+'%';
	}
	
	return (
		<div>
		  <input
		  	className={montserrat.className}
			name="margin-input"
			onKeyDown={keyPressHanlder}
			placeholder='5%'
			value={(hash in savedMarkets) ? percentageFormat(savedMarkets[hash]["margin"]) : "0%"}
		  />
		</div>
	);
};

export default PercentageInput;