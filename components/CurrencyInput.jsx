import styles from '@/styles/Home.module.css'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"

const CurrencyInput = ({value, setValue, minValue, maxValue, otherCond}) => {
	const keyPressHanlder = (event) => {
		const { key } = event;
		setValue((prevValue) =>
		  key !== "Backspace"
			? !Number.isNaN(parseInt(key))
			  ? prevValue + key
			  : prevValue
			: prevValue.substring(0, prevValue.length - 1)
		);
	};
	 
	function currencyFormat(num) {
	   return '$' + Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}
	
	
	return (
		<div>
		  <input
		  	className={`${montserrat.className} ${(value < minValue || value > maxValue || !otherCond) ? styles.inputred : styles.inputvalid}`}
			name="notional-input"
			onKeyDown={keyPressHanlder}
			placeholder="$0"
			value={value !== "" ? currencyFormat(value) : ""}
			onChange={()=>{}}
		  />
		</div>
	);
};

export default CurrencyInput;