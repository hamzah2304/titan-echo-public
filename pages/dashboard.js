import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoggedInBtn from "components/LoggedInBtn";
import InfoPopUp from "components/InfoPopUp";
import RemoveStrategyPopUp from "components/RemoveStrategyPopUp";
import DeleteAllOrdersPopUp from "components/DeleteAllOrdersPopUp";
import DashboardStratTable from "components/DashboardStratTable";
import ListeningBanner from "components/ListeningBanner";
import EthTipJar from "@/components/EthTipJarAI";
import Script from "next/script";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import { useState } from "react";

import { getTest, postRemoveStrategy } from "../titanEchoAPI";

// import magic from '../magic';

import AuthProvider from "components/AuthProvider";

export default function Home() {
  const listeningState = useState("blank");

  const userStrategiesState = useState({});
  let [userStrategies, setUserStrategies] = userStrategiesState;

  const infoState = useState({ title: "", content: [], active: false });
  let [info, setInfo] = infoState;

  const strategyPopupState = useState({ active: false, stratId: 0 });
  let [strategyPopup, setStrategyPopup] = strategyPopupState;

  const deleteAllOrdersPopUpState = useState({ active: false });
  let [deleteAllOrdersPopUp, setDeleteAllOrdersPopUp] =
    deleteAllOrdersPopUpState;

  const userStrategiesUpdateState = useState(0);
  let [userStrategiesUpdate, setUserStrategiesUpdate] =
    userStrategiesUpdateState;

  const usdcBalanceState = useState(null);

  return (
    <>
      <AuthProvider
        listeningState={listeningState}
        infoState={infoState}
        setUserStrategiesUpdate={setUserStrategiesUpdate}
      >
        <Head>
          <title>Titan Echo</title>
          <meta name="description" content="Titan echo project" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <ListeningBanner listeningState={listeningState} />
        <main className={`${styles.main} ${styles.dashboardpage}`}>
          <div className={styles.header}>
            <Image
              className={styles.logostyles}
              src="/titanechologohorz-small.svg"
              alt="Titan Echo Logo"
              width={180}
              height={100}
            />
            <LoggedInBtn
              usdcBalanceState={usdcBalanceState}
              deleteAllOrdersPopUpState={deleteAllOrdersPopUpState}
            />
          </div>
          <DeleteAllOrdersPopUp
            deleteAllOrdersPopUpState={deleteAllOrdersPopUpState}
            setInfo={setInfo}
            setUserStrategiesUpdate={setUserStrategiesUpdate}
          />
          <RemoveStrategyPopUp
            userStrategies={userStrategies}
            strategyPopupState={strategyPopupState}
            setInfo={setInfo}
            setUserStrategiesUpdate={setUserStrategiesUpdate}
          />
          <InfoPopUp info={info} setInfo={setInfo} />
          <div className={styles.pagemainwrapper}>
            <div className={styles.pagemain}>
              <DashboardStratTable
                userStrategiesState={userStrategiesState}
                infoState={infoState}
                strategyPopupState={strategyPopupState}
                userStrategiesUpdateState={userStrategiesUpdateState}
              />
            </div>
          </div>
          <EthTipJar />
        </main>
      </AuthProvider>
    </>
  );
}
