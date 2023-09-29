import Head from "next/head";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LoggedInBtn from "components/LoggedInBtn";
import InfoBtn from "components/InfoBtn";
import InfoPopUp from "components/InfoPopUp";
import DeleteAllOrdersPopUp from "components/DeleteAllOrdersPopUp";
import MarketMakerAddrTable from "components/MarketMakerAddrTable";
import AddAddrInput from "components/AddAddrInput";
import MarketSelectSport from "components/MarketSelectSport";
import LeagueSelect from "components/LeagueSelect";
import StrategyBox from "components/StrategyBox";
import SportsDropDown from "components/SportsDropDown";
import LeaguesDropDown from "components/LeaguesDropDown";
import MarketTable from "components/MarketTable";
import SavedMarketTable from "components/SavedMarketTable";
import Button from "components/Button";
import DownArrow from "components/DownArrow";
import EditMarket from "components/EditMarket";
import StrategyPopUp from "components/StrategyPopUp";
import NotionalCreateStrategy from "components/NotionalCreateStrategy";
import ListeningBanner from "components/ListeningBanner";
import Script from "next/script";
import { useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });

import AuthProvider from "components/AuthProvider";

export default function Home() {
  const strategyNameState = useState("");
  let [strategyName, setStrategyName] = strategyNameState;

  const infoState = useState({ title: "", content: [], active: false });
  let [info, setInfo] = infoState;

  const userStrategiesUpdateState = useState(0);
  let [userStrategiesUpdate, setUserStrategiesUpdate] =
    userStrategiesUpdateState;

  const usdcBalanceState = useState(null);
  let [usdcBalance, setUsdcBalance] = usdcBalanceState;

  const sportsMap = {
    Basketball: 1,
    Hockey: 2,
    Baseball: 3,
    Golf: 4,
    Soccer: 5,
    Tennis: 6,
    "Mixed Martial Arts": 7,
    Football: 8,
    "E Sports": 9,
    Racing: 12,
  };
  const sportsMapT = {
    1: "Basketball",
    2: "Hockey",
    3: "Baseball",
    4: "Golf",
    5: "Soccer",
    6: "Tennis",
    7: "Mixed Martial Arts",
    8: "Football",
    9: "E Sports",
    12: "Racing",
  };

  const sports = {
    Football: useState(true),
    Basketball: useState(false),
    Hockey: useState(false),
    Baseball: useState(false),
    Golf: useState(false),
    Soccer: useState(false),
    Tennis: useState(false),
    "Mixed Martial Arts": useState(false),
    "E Sports": useState(false),
    Racing: useState(false),
  };

  const titansState = useState({
    // "0xD26a77BE873CDc25F0238634326f85986E6cBd1F": false, // h test addr
    // "0x1278812630A94B19ca13d1DCc5EF12725630Ef91": false, // tt test addr
    // "0xaaFc24483FEd02a68E31F14b8af80d7c0920C52C": true, // t test addr
    // "0x5509BbD37c7c1074c146CCe86ce193c99e4fe353": true, // t sec test addr
    "0xF59E93290383ED15F73Ee923EbbF29f79e37B6d8": false,
    "0x781555cF6fD1a4B9A36D6dcBB19E90DFE8aDb897": false,
    "0xC83aa25FA5829c789DF2AC5976b4A26d49c648FF": false,
    "0x43328E4e8FEe5A76D50055B23830C4f13e8bDF5D": false,
    "0x8ECc30212256f18E8e493ff7f0CdBf2118772e50": false,
    "0x7381F26688D629Be8502f8d758C8CF88C9f32679": false,
    "0xf88f7bD89450086E9c71A0c3A9b4F147579EdcC6": false,
    "0xeC0127c25658fA2dBcB1A4B72f25a1DfcA942124": false,
    "0x770Cb32509B43203d2E11a658f4413Ad16E09497": false,
    "0x0633Af25A6eFa1683EEB6224484671AeD4045254": false,
    "0xe0DDfc8c0A6C54687dC5Ae86B39d3f59E0Cf3E82": false,
    "0x51BAD09AA09eCB6C6dd0F624F76e0579A0454EbF": false,
  });
  let [titans, setTitans] = titansState;

  const expertise = {
    // "0xD26a77BE873CDc25F0238634326f85986E6cBd1F": "Basketball", // h test addr
    // "0x1278812630A94B19ca13d1DCc5EF12725630Ef91": "Football", // tt test addr
    // "0xaaFc24483FEd02a68E31F14b8af80d7c0920C52C": "Hockey", // t test addr
    "0xF59E93290383ED15F73Ee923EbbF29f79e37B6d8": "Rugby",
    "0x781555cF6fD1a4B9A36D6dcBB19E90DFE8aDb897": "Tennis",
    "0xC83aa25FA5829c789DF2AC5976b4A26d49c648FF": "Tennis/Football",
    "0x43328E4e8FEe5A76D50055B23830C4f13e8bDF5D": "Football",
    "0x8ECc30212256f18E8e493ff7f0CdBf2118772e50": "Baseball",
    "0x7381F26688D629Be8502f8d758C8CF88C9f32679": "Football/Baseball",
    "0xf88f7bD89450086E9c71A0c3A9b4F147579EdcC6": "Tennis",
    "0xeC0127c25658fA2dBcB1A4B72f25a1DfcA942124": "Tennis",
    "0x770Cb32509B43203d2E11a658f4413Ad16E09497": "Basketball",
    "0x0633Af25A6eFa1683EEB6224484671AeD4045254": "Baseball",
    "0xe0DDfc8c0A6C54687dC5Ae86B39d3f59E0Cf3E82": "Soccer",
    "0x51BAD09AA09eCB6C6dd0F624F76e0579A0454EbF": "NHL",
  };

  const addTitanAddrState = useState("");
  let [addTitanAddr, setAddTitanAddr] = addTitanAddrState;

  const leaguesState = useState({});
  let [leagues, setLeagues] = leaguesState;

  const leaguesLoadedState = useState(false);

  const allMarketsState = useState([]);
  let [allMarkets, setAllMarkets] = allMarketsState;

  const marketsState = useState({});
  let [markets, setMarkets] = marketsState;

  const savedMarketsState = useState({});
  let [savedMarkets, setSavedMarkets] = savedMarketsState;

  const notionalState = useState("");
  let [notional, setNotional] = notionalState;

  const currentEditMarketState = useState();
  let [currentEditMarket, setCurrentEditMarket] = currentEditMarketState;

  const isEditMarketState = useState();
  let [isEditMarket, setIsEditMarket] = isEditMarketState;

  const strategyPopupState = useState({ active: false });
  let [strategyPopup, setStrategyPopup] = strategyPopupState;

  const deleteAllOrdersPopUpState = useState({ active: false });
  let [deleteAllOrdersPopUp, setDeleteAllOrdersPopUp] =
    deleteAllOrdersPopUpState;

  const dropdown = {
    sport: useState("Sports – All"),
    league: useState("Leagues – All"),
  };

  let disclaimerTickState = useState(false);

  // + loading markets live into frontend
  function updateMarkets(allNewMarkets) {
    let tempMarkets = {};
    allNewMarkets.forEach((market) => {
      if (
        (dropdown["sport"][0] == "Sports – All" ||
          dropdown["sport"][0] == market["sportLabel"]) &&
        ((dropdown["league"][0] == "Leagues – All" &&
          leagues[market["sportLabel"]][market["leagueLabel"]]) ||
          dropdown["league"][0] == market["leagueLabel"])
      ) {
        tempMarkets[market["marketHash"]] = {
          selected: false,
          gameTime: market["gameTime"],
          sport: market["sportLabel"],
          league: market["leagueLabel"],
          outcomeOneName: market["outcomeOneName"],
          outcomeTwoName: market["outcomeTwoName"],
        };
      }
    });
    setMarkets(tempMarkets);
  }

  function marketSearchBtnClick() {
    updateMarkets(allMarkets);
  }

  console.log(savedMarkets);

  const listeningState = useState("blank");

  // <AddAddrInput addTitanAddr={addTitanAddr} setAddTitanAddr={setAddTitanAddr} setTitans={setTitans}/>

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
        <main className={`${styles.main} ${styles.strategypage}`}>
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
          <StrategyPopUp
            disclaimerTickState={disclaimerTickState}
            strategyPopup={strategyPopup}
            setStrategyPopup={setStrategyPopup}
            notional={notional}
            strategyNameState={strategyNameState}
            savedMarkets={savedMarkets}
            titans={titans}
            setInfo={setInfo}
          />
          <InfoPopUp info={info} setInfo={setInfo} />
          <div
            className={`${styles.strategybuilderwrapper} ${styles.pagemainwrapper}`}
          >
            <div
              className={`${styles.strategybuilder} ${
                !isEditMarket
                  ? styles.visibleStrategyBuilder
                  : styles.hiddenStrategyBuilder
              } ${styles.pagemain}`}
            >
              <StrategyBox
                num="1"
                titlepre="Choose"
                titlemain="Market Makers"
                titlepost="to echo"
              >
                <InfoBtn
                  newInfo={{
                    title: "Choose Market Makers to echo",
                    content: [
                      "The addresses listed represent 'Titans', expert market makers on SX with a significant record of consistent betting returns, some focusing on specific sports.",
                      "By choosing to 'echo' these Titans, you can learn from their strategies while also having the freedom to incorporate your own input and create unique betting combinations.",
                      "Do your own research on each Titan by looking at their profile on SX sharks to verify their expertise in your chosen sport.",
                    ],
                    active: true,
                  }}
                  setInfo={setInfo}
                />
                <MarketMakerAddrTable
                  titans={titans}
                  setTitans={setTitans}
                  expertise={expertise}
                />
              </StrategyBox>
              <DownArrow />
              <StrategyBox
                num="2"
                titlepre="Select"
                titlemain="Sports"
                titlepost=""
              >
                <InfoBtn
                  newInfo={{
                    title: "Select Sports",
                    content: [
                      "The provided list includes various sports available on the SX platform for you to build your making strategy. Ensure the chosen Titans place bets on your selected sport, as this is necessary for you to have their orders to echo.",
                    ],
                    active: true,
                  }}
                  setInfo={setInfo}
                />
                <div className={styles.taglist}>
                  {Object.keys(sports).length &&
                    Object.keys(sports).map((sport, index) => {
                      return (
                        <MarketSelectSport
                          key={index}
                          sport={sport}
                          selected={sports[sport][0]}
                          setSelected={sports[sport][1]}
                        />
                      );
                    })}
                </div>
              </StrategyBox>
              <DownArrow />
              <StrategyBox
                num="3"
                titlepre="Select"
                titlemain="Leagues"
                titlepost=""
              >
                <InfoBtn
                  newInfo={{
                    title: "Select Leagues",
                    content: [
                      "This list partitions the active leagues on SX, corresponding to your selected sports. You have the option to specify which leagues to strategically make, providing an additional layer of precision to your strategy.",
                    ],
                    active: true,
                  }}
                  setInfo={setInfo}
                />
                <LeagueSelect
                  sportsMapT={sportsMapT}
                  sports={sports}
                  leaguesState={leaguesState}
                  leaguesLoadedState={leaguesLoadedState}
                />
              </StrategyBox>
              <DownArrow />
              <StrategyBox
                num="4"
                titlepre="Filter"
                titlemain="Markets"
                titlepost=""
              >
                <InfoBtn
                  newInfo={{
                    title: "Filter Markets",
                    content: [
                      "You're presented with a comprehensive list of matches within your selected sports and leagues, facilitating targeted strategies based on specific teams or game times.",
                      "While all combinations are at your disposal, selecting a wider range of markets enhances the diversity of your strategy; however, it also results in your available capital being allocated across each chosen market.",
                    ],
                    active: true,
                  }}
                  setInfo={setInfo}
                />
                <div>
                  <div className={styles.dropdownrow}>
                    <SportsDropDown dropdown={dropdown} sports={sports} />
                    <LeaguesDropDown
                      dropdown={dropdown}
                      sports={sports}
                      leagues={leagues}
                      leaguesLoadedState={leaguesLoadedState}
                    />
                    <Button
                      btnname="Search"
                      onClickCond={marketSearchBtnClick}
                      cond={true}
                    />
                  </div>
                  <MarketTable
                    sportsMap={sportsMap}
                    sportsMapT={sportsMapT}
                    sports={sports}
                    leagues={leagues}
                    marketsState={marketsState}
                    savedMarketsState={savedMarketsState}
                    leaguesLoadedState={leaguesLoadedState}
                    updateMarkets={updateMarkets}
                    allMarketsState={allMarketsState}
                    dropdown={dropdown}
                  />
                </div>
              </StrategyBox>
              <DownArrow />
              <StrategyBox
                num="5"
                titlepre="Design"
                titlemain="Strategy"
                titlepost=""
              >
                <InfoBtn
                  newInfo={{
                    title: "Design Strategy",
                    content: [
                      "Now, you're given the opportunity to design your strategy, by viewing your chosen markets and tweaking properties such as margin and shade. Each market includes an option for removal from your strategy. The notional value signifies the total pool of capital, drawn from the USDC in your account, allocated for this strategy. Notional will be divided uniformly been matches in the strategy; minimum $25.00 per match.",
                    ],
                    active: true,
                  }}
                  setInfo={setInfo}
                />
                <SavedMarketTable
                  marketsState={marketsState}
                  savedMarketsState={savedMarketsState}
                  currentEditMarket={currentEditMarket}
                  setCurrentEditMarket={setCurrentEditMarket}
                  setIsEditMarket={setIsEditMarket}
                />
                <NotionalCreateStrategy
                  notional={notional}
                  setNotional={setNotional}
                  savedMarkets={savedMarkets}
                  usdcBalanceState={usdcBalanceState}
                  setStrategyPopup={setStrategyPopup}
                  setInfo={setInfo}
                />
              </StrategyBox>
            </div>
            <EditMarket
              savedMarketsState={savedMarketsState}
              savedMarkets={savedMarkets}
              setSavedMarkets={setSavedMarkets}
              currentEditMarket={currentEditMarket}
              isEditMarket={isEditMarket}
              setIsEditMarket={setIsEditMarket}
            />
          </div>
        </main>
      </AuthProvider>
    </>
  );
}