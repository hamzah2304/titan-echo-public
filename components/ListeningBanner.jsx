import styles from "../styles/Home.module.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import { useEffect } from "react";

const ListeningBanner = ({ listeningState }) => {
  const [listening, setListening] = listeningState;
  console.log(listening);

  useEffect(() => {
    let changeToListening;
    /* let changeToBlank; */

    if (listening == "connect") {
      changeToListening = setTimeout(() => {
        setListening("listening");
      }, 5000);
    }
    /* else if (listening=='disconnect'){
			changeToBlank = setTimeout(() => {
				setListening('blank');
			}, 10000);
		} */
    return () => {
      if (changeToListening) clearTimeout(changeToListening);
      /* if (changeToBlank) clearTimeout(changeToBlank); */
    };
  }, [listening]);

  if (listening == "connect") {
    return (
      <div
        className={`${styles.listeningbanner} ${styles.bannerconnect} ${montserrat.className}`}
      >
        <p>connected to server</p>
      </div>
    );
  } else if (listening == "listening") {
    return (
      <div
        className={`${styles.listeningbanner} ${styles.bannerlistening} ${montserrat.className}`}
      >
        <p>listening to titans...</p>
      </div>
    );
  } else if (listening == "disconnect") {
    //setInterval(()=>{
    //	console.log('set b')
    //	setListening('blank');
    //},5000);
    return (
      <div
        className={`${styles.listeningbanner} ${styles.bannerdisconnect} ${montserrat.className}`}
      >
        <p>disconnected from server</p>
      </div>
    );
  } else if (listening == "blank") {
    return (
      <div
        className={`${styles.listeningbanner} ${styles.bannerblank} ${montserrat.className}`}
      ></div>
    );
  }
};

export default ListeningBanner;
