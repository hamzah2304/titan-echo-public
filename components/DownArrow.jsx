import styles from '@/styles/Home.module.css'
import Image from 'next/image'

const DownArrow = () => {
	return (
		<div className={styles.downarrow}>
			<div className="scrollArrow">
				<Image
					src="/downarrow.svg"
					alt="Down Arrow"
					width={30}
					height={30}
				/>
			</div>
		</div>
	);
};

export default DownArrow;