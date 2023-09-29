import styles from "/styles/Home.module.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import Image from "next/image";

import StrategyName from "components/StrategyName";
import Button from "components/Button";

import { useAuth } from "components/AuthContext";

import { postCreateStrategy } from "../titanEchoAPI";

const StrategyPopUp = ({
  disclaimerTickState,
  strategyPopup,
  setStrategyPopup,
  notional,
  strategyNameState,
  savedMarkets,
  titans,
  setInfo,
}) => {
  let [disclaimerTick, setDisclaimerTick] = disclaimerTickState;
  let [strategyName, setStrategyName] = strategyNameState;
  let { user, loggedIn, setLoggedIn, setNotLoggedInInfo } = useAuth();

  if (loggedIn) {
    return (
      <div
        className={`${styles.funcpopup} ${
          strategyPopup.active
            ? styles.funcpopupactive
            : styles.funcpopupinactive
        }`}
      >
        <h3 className={montserrat.className}>Confirm Strategy</h3>
        <Image
          className={styles.funccross}
          src="/cross.svg"
          alt="close popup"
          width={25}
          height={25}
          onClick={() => {
            setStrategyPopup({ active: false });
            setDisclaimerTick(false);
          }}
        />
        <p>Are you sure you want to create this strategy?</p>
        <p>
          You have allocated{" "}
          <span className={styles.lightblue}>${notional}</span> to this
          strategy.
        </p>
        <StrategyName
          strategyName={strategyName}
          setStrategyName={setStrategyName}
        />
        <div
          className={`${styles.stratDisclaimerWrapper} ${
            disclaimerTick ? styles.disclaimerTicked : styles.disclaimerUnticked
          }`}
        >
          <div
            className={styles.disclaimerCheckBox}
            onClick={() => {
              setDisclaimerTick(!disclaimerTick);
            }}
          >
            <Image
              className={styles.disclaimerchecked}
              src="/checked-box.svg"
              alt="checked"
              width={25}
              height={25}
              priority
            />
            <Image
              className={styles.disclaimerunchecked}
              src="/unchecked-box.svg"
              alt="unchecked"
              width={25}
              height={25}
              priority
            />
          </div>
          <h5 className={`${montserrat.className} ${styles.disclaimertext}`}>
            Agree to the terms of the{" "}
            <a href="/disclaimer" target="_blank">
              disclaimer
            </a>
            .
          </h5>
        </div>
        <div className={styles.btnrow}>
          <Button
            btnname={"Cancel"}
            onClickCond={() => {
              setStrategyPopup({ active: false });
              setDisclaimerTick(false);
            }}
            cond={true}
            red={true}
          />
          <Button
            btnname={"Echo"}
            cond={disclaimerTick && strategyName.length > 0}
            onClickCond={() => {
              let stratTitans = Object.keys(titans).filter((addr) => {
                return titans[addr];
              });
              let postMarkets = {};
              let potentialVal = parseInt(notional) / Object.keys(savedMarkets).length;
              Object.keys(savedMarkets).forEach((marketHash) => {
                postMarkets[marketHash] = {
                  margin: savedMarkets[marketHash]["margin"],
                  shade: savedMarkets[marketHash]["shade"],
                  gameTime: savedMarkets[marketHash]["gameTime"],
                  remaining: potentialVal,
                  potential: potentialVal,
                  name:
                    savedMarkets[marketHash]["outcomeOneName"] +
                    " vs " +
                    savedMarkets[marketHash]["outcomeTwoName"],
                  unhandledChange: true,
                };
              });
              postCreateStrategy(
                {
                  user: user.publicAddress,
                  name: strategyName,
                  titans: stratTitans,
                  notional: parseInt(notional),
                  markets: postMarkets,
                  currentOrders: [],
                  email: user.email,
                },
                (data) => {
                  if (data.auth == false) {
                    setStrategyPopup({ active: false });
                    setNotLoggedInInfo("server");
                    setLoggedIn(false);
                  } else {
                    if (data.success) window.location = "/dashboard";
                    else {
                      setStrategyPopup({ active: false });
                      setInfo({
                        title: "Oops",
                        content: ["Something went wrong.", "Please try again."],
                        active: true,
                      });
                    }
                  }
                }
              );
            }}
          />
        </div>
      </div>
    );
  }
};

export default StrategyPopUp;
