import styles from '/styles/Home.module.css';

const InfoBtn = ({newInfo, setInfo}) => {
  return (
    <div className={styles.infobtn} onClick={()=>{setInfo(newInfo);}}>
        <p>?</p>
    </div>
  );
}

export default InfoBtn