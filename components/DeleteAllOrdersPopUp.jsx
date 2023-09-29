import styles from "/styles/Home.module.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import Image from "next/image";

import StrategyName from "components/StrategyName";
import Button from "components/Button";
import { useAuth } from "components/AuthContext";

import { postDeleteAllOrders } from "../titanEchoAPI.js";

const DeleteAllOrdersPopUp = ({
  deleteAllOrdersPopUpState,
  setInfo,
  setUserStrategiesUpdate,
}) => {
  let [deleteAllOrdersPopUp, setDeleteAllOrdersPopUp] =
    deleteAllOrdersPopUpState;
  let { loggedIn, setLoggedIn, setNotLoggedInInfo } = useAuth();

  return (
    <div
      className={`${styles.funcpopup} ${
        deleteAllOrdersPopUp.active
          ? styles.funcpopupactive
          : styles.funcpopupinactive
      }`}
    >
      <h3 className={montserrat.className}>
        <span className={styles.semitransparent}>Delete&nbsp;</span>all
        <span className={styles.semitransparent}>&nbsp;orders?</span>
      </h3>
      <Image
        className={styles.funccross}
        src="/cross.svg"
        alt="close popup"
        width={25}
        height={25}
        onClick={() => {
          setDeleteAllOrdersPopUp({ active: false });
        }}
      />
      <p>
        Are you sure you want to delete all the orders on SX.bet? This action
        will remove <strong>all</strong> orders on the SX.bet account associated
        with this TitanEcho account, not just those placed through
        TitanEcho.bet.
      </p>
      <div className={`${styles.btnrow} ${styles.deleteallordersbtnrow}`}>
        <Button
          btnname={"Cancel"}
          onClickCond={() => {
            setDeleteAllOrdersPopUp({ active: false });
          }}
          cond={true}
        />
        <Button
          btnname={"Delete"}
          cond={true}
          red={true}
          onClickCond={() => {
            postDeleteAllOrders((data) => {
              console.log(data);
              if (data.auth == false) {
                setDeleteAllOrdersPopUp({ active: false });
                setNotLoggedInInfo("server");
                setLoggedIn(false);
              } else {
                if (data.success) {
                  setDeleteAllOrdersPopUp({ active: false });
                  if (data.state == "orders deleted server error") {
                    setInfo({
                      title: "Success",
                      content: [
                        "Your orders were successfully deleted on SX.bet, however something went wrong on the TitanEcho servers.",
                      ],
                      active: true,
                    });
                  } else if (data.state == "orders empty") {
                    setInfo({
                      title: "Success",
                      content: ["You had no active orders on SX.bet"],
                      active: true,
                    });
                  } else {
                    setInfo({
                      title: "Success",
                      content: ["All of your orders have been cancelled."],
                      active: true,
                    });
                  }
                  setUserStrategiesUpdate(
                    Math.floor(Math.random() * 10000000000)
                  );
                } else {
                  setDeleteAllOrdersPopUp({ active: false });
                  if (data.state == "client disconnected") {
                    setInfo({
                      title: "Oops",
                      content: [
                        "Something went wrong. The server could not find the connection to your browser.",
                      ],
                      active: true,
                    });
                  } else if (data.state == "server error") {
                    setInfo({
                      title: "Oops",
                      content: [
                        "Something went wrong. An error occurred in the server. Please try again.",
                      ],
                      active: true,
                    });
                  } else {
                    setInfo({
                      title: "Oops",
                      content: ["Something went wrong.", "Please try again."],
                      active: true,
                    });
                  }
                }
              }
            });
          }}
        />
      </div>
    </div>
  );
};

export default DeleteAllOrdersPopUp;
