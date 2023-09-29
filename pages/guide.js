import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "/styles/Home.module.css";
import TitleBox from "/components/TitleBox";
import GuideBox from "/components/GuideBox";
import LoggedInBtn from "components/LoggedInBtn";
import InfoPopUp from "components/InfoPopUp";
import DeleteAllOrdersPopUp from "components/DeleteAllOrdersPopUp";

import ListeningBanner from "components/ListeningBanner";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import AuthProvider from "components/AuthProvider";

const Guide = () => {
  const listeningState = useState("blank");

  const infoState = useState({ title: "", content: [], active: false });
  let [info, setInfo] = infoState;

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
          <title>Titan Echo Info</title>
          <meta name="description" content="Titan echo project Info page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <ListeningBanner listeningState={listeningState} />
        <main className={`${styles.main} ${styles.guidepage}`}>
          <div className={styles.header}>
            <a href="/dashboard">
              <Image
                className={styles.logostyles}
                src="/titanechologohorz-small.svg"
                alt="Titan Echo Logo"
                width={180}
                height={100}
              />
            </a>
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
          <InfoPopUp info={info} setInfo={setInfo} />

          <div className={styles.pagemainwrapper}>
            <div className={styles.strategybuilder}>
              <TitleBox
                titlepre=""
                titlemain={["Quickstart Guide"]}
                titlepost=""
              >
                <p>
                  Thank you for choosing Titan Echo; this is our quick-start
                  guide.
                </p>
              </TitleBox>

              <GuideBox
                num={1}
                paragraphs={[
                  "You have completed the first step, creating a Titan Echo account.",
                ]}
              />

              <GuideBox
                num={2}
                paragraphs={[
                  "Now, click your account name and 'Export private key' and import your wallet into MetaMask using the private key. Then login to SX.BET using the imported wallet.",
                  "Remember, your private key is sensitive information. Never share it with anyone and make sure to store it securely.",
                ]}
              />

              <GuideBox
                num={3}
                paragraphs={[
                  "Fund your account with USDC on SX Mainnet (at least $30).",
                ]}
              />

              <GuideBox
                num={4}
                paragraphs={[
                  "Make a $5 bet on SX.BET. This is required to enable your account to offer odds on the exchange.",
                ]}
              />

              <GuideBox
                num={5}
                paragraphs={[
                  "Return to the Dashboard and create your own strategies!",
                ]}
              />
            </div>
          </div>
        </main>
      </AuthProvider>
    </>
  );
};

export default Guide;
