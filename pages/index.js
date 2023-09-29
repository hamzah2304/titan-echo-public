import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React from "react";
import styles from "/styles/Home.module.css";
import TitleBox from "/components/TitleBox";
import TextBox from "/components/TextBox";
import ImageBox from "/components/ImageBox";
import MechanicsBox from "/components/MechanicsBox";
import Footer from "/components/Footer"; // Import Footer component
import Link from "next/link";
import LoginBox from "/components/LoginBox";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import { useState, useEffect } from "react";

const textContent1 = `Our pre-game betting bot operates by replicating the strategies of the industry giants, 
thereby estimating pre-match odds based on their methods. These estimates, crafted for 
exhaustive, mutually-exclusive pre-game bets for any given market, are subsequently 
normalised into percentages, or equivalently, implied probabilities. After this 
transformation, a shade is formulated by reallocating up to 3% between Team 1 and Team 2. 
Following this, a margin is implemented such that the total percentages sum to `;

const latexContent1 = `$(100 + \\mathrm{margin}) \\%$.`;

const textContent2 = `The deployment of this margin serves to deflate 
the offered odds, thereby generating an implied positive expected value for each bet for 
the market maker.`;

const textContent3 = `Another essential function of our pre-game betting bot is the distribution of the volume 
of orders across all possible outcomes. This operation is designed to ensure that if all 
of a user’s orders are executed, the user is left without a position (delta-neutral) and secures their 
notional `;

const latexContent2 = `$* \\,\\,\\,\\,(1-\\frac{100}{100+margin}).$`;

const textContent4 = `This manner of volume placement is in harmony with the 
bot's computed odds and offers a robust method to manage risk and enhance the potential 
for profit, regardless of the actual outcome of the event.`;

export default function Home() {
  const magicloadedState = useState(false);
  let [magicloaded, setMagicloaded] = magicloadedState;

  const web3loadedState = useState(false);
  let [web3loaded, setWeb3loaded] = magicloadedState;

  return (
    <>
      <Head>
        <title>Titan Echo</title>
        <meta name="description" content="Titan echo project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <script
        defer
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"
      ></script>
      <script defer src="https://auth.magic.link/sdk"></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/web3@1.2.11/dist/web3.min.js"
      ></script>
      <script defer src="/script.js"></script>
      <img className={styles.squigle} src="/squigle.svg" />
      <main className={`${styles.main} ${styles.indexpage}`}>
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
        </div>
        <div style={{ maxWidth: 800 }}>
          <div className={styles.titleandlogin}>
            <h2 className={`${montserrat.className} ${styles.light}`}>
              <span className={styles.semitransparent}>Echo the Titans of</span>
              <br />
              <span className={styles.fullwhite}>Market Making</span>
              <br />
              <span className={styles.semitransparent}>on SX.bet</span>
            </h2>
            <LoginBox />
          </div>
          <TextBox
            title="Welcome, Sports Bettors"
            paragraphs={[
              "We're excited to introduce you to Titan Echo, a revolutionary platform designed to enhance your pre-game betting experience. Titan Echo empowers you to implement no-code market-making strategies, augmenting your predictive prowess with the insights from top-tier bet market makers - our 'Titans'.",
              "Our user-friendly bot provides you with the flexibility to target specific sports, leagues, teams, and even particular games for automatic pre-game bets. You can customise your betting approach based on your preferred quantity, margin aggression, and shading. The bot is initiated to market make all leagues present on SX as of 1st July 2023.",
              "Choosing Titan Echo comes with numerous advantages. You'll gain access to improved odds as you avoid crossing the spread, and benefit from lower maker fees compared to taker fees.",
              "Most importantly, you can enjoy passive Expected Value (EV) from your selected Titans' strategies, representing a major value-add opportunity. Join us on this exhilarating journey as we reshape the pre-game sports betting landscape with Titan Echo. Happy betting!",
            ]}
          />

          <ImageBox
            images={["/strategy2.png", "/strategy3.png", "/strategy1.png"]}
          />

          <MechanicsBox
            title="Mechanics"
            textContent1={textContent1}
            latexContent1={latexContent1}
            textContent2={textContent2}
            textContent3={textContent3}
            latexContent2={latexContent2}
            textContent4={textContent4}
          />

          <ImageBox
            images={["/obsidian1.png", "/obsidian2.png", "/obsidian3.png"]}
          />

          <Footer text="Titan Echo provides betting computations based on SX data. We don't guarantee outcomes or assume responsibility for any losses, damages, or harm resulting from the use of or reliance on our information. Betting involves risk and is not permitted for those under the legal gambling age in your jurisdiction. Use responsibly at your own risk." />
        </div>
      </main>
    </>
  );
}
