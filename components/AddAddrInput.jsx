import styles from '@/styles/Home.module.css'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"
import { useState } from "react";

const AddAddrInput = ({addTitanAddr, setAddTitanAddr, setTitans}) => {
	const handleChange = (e) => {
		const input = e.target.value;
		const validPartialAddress = /^0x?[a-fA-F0-9]{0,40}$/;
		if (!input || validPartialAddress.test(input)) {
			setAddTitanAddr(input);
		}
	};

	const handleClick = () => {
		if (addTitanAddr.length === 42) {
			setTitans(prevTitans => {
				return { [addTitanAddr]: true, ...prevTitans }
			});
		}
	}

	return (
		<div className={styles.addaddrwrapper}>
		  <div className={`${montserrat.className} ${styles.subtitleunderline}`}>Add Address</div>
		  <div>
			<input
			  name="name-input"
			  placeholder="0x0000000000000000000000000000000000000000"
			  value={addTitanAddr}
			  onInput={handleChange}
			/>
		  </div>
		  <div className={`${styles.addaddr} ${addTitanAddr.length>0 ? styles.addaddractive : styles.addaddrinactive}`} onClick={handleClick}>
			+
		  </div>
		</div>
	);
};

export default AddAddrInput;