import React from 'react'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
const montserrat = Montserrat({ subsets: ['latin'] })
import { Montserrat } from "next/font/google"
import PercentageInput from 'components/PercentageInput'

const EditMarket = ({savedMarketsState,currentEditMarket,isEditMarket,setIsEditMarket}) => {
	
	let [savedMarkets,setSavedMarkets] = savedMarketsState;

	const onClose = () => {
		setIsEditMarket(false);
	}
	function onClickShadeRadio(hash,shadeV) {
		return ()=>{
			setSavedMarkets(prevSavedMarkets => ({
				...prevSavedMarkets,
				[hash]: {
					...prevSavedMarkets[hash],
					shade: shadeV
				}
			}));
		}
	}
	if (currentEditMarket in savedMarkets){
		return (
			<div className={`${isEditMarket ? styles.editMarket : styles.hiddenEditMarket} ${styles.editMarketWrapper}`}>
				<div className={styles.card}>
					<div onClick={onClose}>
						<Image
							className={styles.closeEditMarket}
							src="/cross.svg"
							alt="Close Edit Market"
							width={30}
							height={30}
				  		/>
					</div>
					<h3 className={`${montserrat.className} ${styles.light}`}>
						<span className={styles.semitransparent}>Edit&nbsp;</span>
						<span>Market</span>
						<span className={styles.semitransparent}>&nbsp;Info</span>
					</h3>
					<div className={styles.marginWrapper}>
						<p className={styles.description}>Margin</p>
						<PercentageInput hash={currentEditMarket} savedMarketsState={savedMarketsState}/> 
					</div>
					<div className={styles.shadeWrapper}>
						<p className={styles.description}>Shade</p>
						{/* <PercentageInput value={margin} setValue={setMargin} /> */}
						<div className={styles.shadeWrapperNames}>
							<p>{savedMarkets[currentEditMarket]["outcomeOneName"]}</p>
							<p>{savedMarkets[currentEditMarket]["outcomeTwoName"]}</p>
						</div>
						<div className={`${"shadeWrapper-"+((currentEditMarket in savedMarkets) ? savedMarkets[currentEditMarket]['shade'] : "").toString()} ${"shadeWrapper"}`}>
							{([3,2,1,0,-1,-2,-3]).map((shadeV,index) => {
								return (
									<div key={index} className={`${"shade-"+shadeV.toString()} ${"shade-"}`} onClick={onClickShadeRadio(currentEditMarket,shadeV)} >
										<Image
											className="shadeChecked"
											src="/checked.svg"
											alt={"Shade "+shadeV.toString()+" check"}
											width={20}
											height={20}
										/>
										<Image
											className="shadeUnChecked"
											src="/unchecked.svg"
											alt={"Shade "+shadeV.toString()+" check"}
											width={20}
											height={20}
										/>
										<p className={`${styles.shadetxt} ${montserrat.className}`}>{shadeV}</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default EditMarket