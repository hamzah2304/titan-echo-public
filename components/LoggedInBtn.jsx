import styles from "../styles/Home.module.css";
import Button from "components/Button";
import { useState, useEffect } from "react";

import { useAuth } from "components/AuthContext";
import { logout } from "../titanEchoAPI";
import DashboardButton from "components/DashboardButton";
import GuideButton from "components/GuideButton";

const LoggedInBtn = ({ usdcBalanceState, deleteAllOrdersPopUpState }) => {
  let [deleteAllOrdersPopUp, setDeleteAllOrdersPopUp] =
    deleteAllOrdersPopUpState;

  let logindropdownState = useState(false);
  let [logindropdown, setLogindropdown] = logindropdownState;
  let [usdcBalance, setUsdcBalance] = usdcBalanceState;
  let { web3, web3Loaded, user, magic, loggedIn } = useAuth();

  useEffect(() => {
    if (web3Loaded && loggedIn) {
      const usdcAddress = "0xe2aa35C2039Bd0Ff196A6Ef99523CC0D3972ae3e";
      const erc20Abi = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
      ];
      const fetchUsdcBalance = async () => {
        const usdcContract = new web3.eth.Contract(erc20Abi, usdcAddress);
        const userBalanceWei = await usdcContract.methods
          .balanceOf(user.publicAddress)
          .call();
        const userBalance = web3.utils.fromWei(userBalanceWei, "mwei");
        setUsdcBalance(parseFloat(userBalance).toFixed(1));
      };
      fetchUsdcBalance();
    }
  }, [loggedIn, web3Loaded]);

  if (loggedIn) {
    return (
      <div className={styles.loggedinwrapper}>
        {logindropdown && (
          <div className={styles.logindropdown}>
            <Button
              btnname={"Export Private Key"}
              cond={true}
              red={true}
              muted={true}
              onClickCond={() => {
                window
                  .open("https://reveal.magic.link/titanecho", "_blank")
                  .focus();
              }}
            />
            <Button
              btnname={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>Copy Public Address</span>
                  <img
                    src="copy.png"
                    alt="copy"
                    style={{
                      height: "1.2em",
                      marginLeft: "0.5em",
                      verticalAlign: "middle",
                    }}
                  />
                </div>
              }
              cond={true}
              muted={true}
              onClickCond={() => {
                navigator.clipboard.writeText(user.publicAddress);
              }}
            />
            <Button
              btnname={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="usdc.png"
                    alt="logo"
                    style={{
                      height: "1.2em",
                      marginRight: "0.5em",
                      verticalAlign: "middle",
                      backgroundColor: "transparent",
                    }}
                  />
                  ${usdcBalance} USDC
                </div>
              }
              cond={true}
              muted={true}
              onClickCond={() => {
                window.open(
                  `https://explorer.sx.technology/address/${user.publicAddress}/tokens#address-tabs`,
                  "_blank"
                );
              }}
            />
            <Button
              btnname={"Delete all orders"}
              cond={true}
              red={true}
              onClickCond={() => {
                setDeleteAllOrdersPopUp({ active: true });
              }}
            />
          </div>
        )}
        <div className={styles.buttonsContainer}>
          <div
            className={styles.loggedinbtn}
            onClick={() => {
              setLogindropdown(!logindropdown);
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="user.png"
                alt="user"
                style={{
                  height: "1.2em",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
              />
              <p>{user.email}</p>
            </div>
          </div>
          {window.location.pathname === "/strategy" ? (
            <DashboardButton />
          ) : null}
          {window.location.pathname === "/guide" ? <DashboardButton /> : null}
          {window.location.pathname === "/dashboard" ? <GuideButton /> : null}
          <Button
            id={"logoutbtn"}
            btnname={"Logout"}
            cond={true}
            red={true}
            muted={true}
            onClickCond={() => {
              logout(magic);
            }}
          />
        </div>
      </div>
    );
  }
};

export default LoggedInBtn;
