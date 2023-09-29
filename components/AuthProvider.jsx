import { useEffect, useState } from "react";
import AuthContext from "components/AuthContext";
import NotLoggedInInfo from "components/NotLoggedInInfo";
import SocketDisconnectedPopUp from "components/SocketDisconnectedPopUp";

import {
  magicAuthPostOrder,
  magicAuthCancelOrders,
  magicAuthCancelAllOrders,
} from "../magicSign";
import { testSignAndPost, testSignAndCancel } from "../magicSignTest";

import { getSpecificMarket } from "../titanEchoAPI";
import { startDate } from "../startdate";

function debugMsg(msg) {
  console.log(msg, " – time", new Date().toLocaleTimeString("en-UK"));
}

const localhostServer = "http://localhost:3001";
const remoteServer = "https://titanecho-backend.onrender.com";

const serverUrl = remoteServer;

function AuthProvider({
  listeningState,
  infoState,
  setUserStrategiesUpdate,
  children,
}) {
  const [listening, setListening] = listeningState;
  const [info, setInfo] = infoState;

  const [magic, setMagic] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [magicLoaded, setMagicLoaded] = useState(false);
  const [notLoggedInInfo, setNotLoggedInInfo] = useState("");
  const [web3, setWeb3] = useState(null);
  const [web3Loaded, setWeb3Loaded] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketLoaded, setSocketLoaded] = useState(false);
  const [socketAuth, setSocketAuth] = useState(false);
  const [socketDisconnectedPopUp, setSocketDisconnectedPopUp] = useState(false);

  useEffect(() => {
    import("magic-sdk").then(({ Magic }) => {
      const magicInstance = new Magic("pk_live_920E75807BBA55A6", {
        network: { rpcUrl: "https://rpc.sx.technology", chainId: 416 },
      });
      setMagic(magicInstance);
      magicInstance.user.isLoggedIn().then((loggedin) => {
        if (loggedin) {
          magicInstance.user.getInfo().then(({ email, publicAddress }) => {
            setUser({ email, publicAddress });
            setLoggedIn(true);
            setMagicLoaded(true);
          });
        } else {
          setNotLoggedInInfo("client");
          setMagicLoaded(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (magicLoaded) {
      import("web3").then(({ Web3 }) => {
        const web3Instance = new Web3(magic.rpcProvider);
        setWeb3(web3Instance);
        setWeb3Loaded(true);
      });
    }
  }, [magicLoaded]);

  useEffect(() => {
    if (web3Loaded && loggedIn) {
      // testing sign transaction
      // testSignAndSent(user,web3);
      // testSignAndCancel(user,web3);

      console.log("pre import socket io");
      import("socket.io-client").then(({ io }) => {
        console.log("post import socket io");
        magic.user.getIdToken().then(async (token) => {
          const socket = await io(serverUrl, {
            credentials: "include",
            withCredentials: true,
            auth: {
              token: token,
            },
          });

          if (!socket.connected) setListening("disconnect");

          setSocket(socket);
          setSocketLoaded(true);
          console.log("socket connected");

          socket.on("auth", (auth) => {
            if (!auth) {
              console.log("socket not authenticated");
              socket.disconnect();
              console.log("disconnect due to bad auth");
              setSocketAuth(false);
            } else {
              console.log("socket authenticated");
              setSocketAuth(true);
              setSocketDisconnectedPopUp(false);
              setListening("connect");
            }
          });

          setInterval(() => {
            socket.emit("ping");
            debugMsg("ping");
          }, 60 * 1000);

          socket.on("pong", () => {
            debugMsg("pong");
          });

          socket.on("disconnect", function () {
            console.log("disconnected");
            setListening("disconnect");
            setSocketDisconnectedPopUp(true);
          });

          // Clean up the socket connection when the component unmounts
          return () => {
            socket.disconnect();
          };
        });
      });
    }
  }, [web3Loaded]);

  useEffect(() => {
    if (socketAuth) {
      socket.emit("manualsync");

      /* data:
			- marketHash
			- titanPercentageOdds
			- strategy
			*/
      socket.on("REQ_postNewOrder", (data) => {
        magicAuthPostOrder(user, web3, data)
          .then((result) => {
            socket.emit("RES_postNewOrder_" + data.theHM.toString(), result);
            if (result.success) {
              setUserStrategiesUpdate(Math.floor(Math.random() * 10000000000));
              getSpecificMarket(data.marketHash, (marketdata) => {
                setInfo({
                  title: "You Echoed a Titan Order",
                  content: [
                    "You echoed a titan by placing orders on SX.bet",
                    `Game: ${marketdata.outcomeOneName} vs ${marketdata.outcomeTwoName}`,
                    `Sport: ${marketdata.sportLabel}`,
                    `League: ${marketdata.leagueLabel}`,
                    `Date: ${startDate(marketdata.gameTime)}`,
                  ],
                  active: true,
                });
              });
            }
          })
          .catch(function (error) {
            console.log(error);
            if (
              error.message == "Not enough notional to continue with strategy"
            ) {
              setInfo({
                title: `Out of money in strategy ${data.strategy.name}`,
                content: [
                  "Your strategy has run out of money. Please re-create the strategy to refill the notional.",
                ],
                active: true,
              });
            } else if (
              error.message ==
              "Notional is not large enough to allocate at least $12 to each order"
            ) {
              setInfo({
                title: `Something has gone wrong in ${data.strategy.name}`,
                content: [
                  "You do not have the required notional to place this order. Please contact the team at support email.",
                  `Game: ${marketdata.outcomeOneName} vs ${marketdata.outcomeTwoName}`,
                  `Sport: ${marketdata.sportLabel}`,
                  `League: ${marketdata.leagueLabel}`,
                  `Date: ${startDate(marketdata.gameTime)}`,
                ],
                active: true,
              });
            }
          });
      });

      /* userOrderHashes:
			- array of userOrderHashes to be cancelled
			 */
      socket.on("REQ_cancelCurrentOrder", (data) => {
        magicAuthCancelOrders(user, web3, data.orderHashes).then((result) => {
          socket.emit(
            "RES_cancelCurrentOrder_" + data.theHM.toString(),
            result
          );
          if (result.success) {
            setUserStrategiesUpdate(Math.floor(Math.random() * 10000000000));
            getSpecificMarket(data.marketHash, (marketdata) => {
              setInfo({
                title: "You Echoed a Titan Cancel",
                content: [
                  "You echoed a titan by cancelling orders on SX.bet",
                  `Game: ${marketdata.outcomeOneName} vs ${marketdata.outcomeTwoName}`,
                  `Sport: ${marketdata.sportLabel}`,
                  `League: ${marketdata.leagueLabel}`,
                  `Date: ${startDate(marketdata.gameTime)}`,
                ],
                active: true,
              });
            });
          }
        });
      });

      socket.on("REQ_deleteAllOrders", () => {
        magicAuthCancelAllOrders(user, web3).then((result) => {
          socket.emit("RES_deleteAllOrders", result);
        });
      });

      socket.on("newStrategyCreated", (data) => {
        {
          /* console.log('newStrategyCreated confirmation') */
        }
        socket.emit("manualsync");
      });

      /* order:
			- publicAddress
			- orderHash
			 */
      {
        /* socket.on('removeorder',(orderInfo)=>{
				console.log(orderInfo);
			}); */
      }
    }
  }, [socketAuth]);

  // Here, you would use the magic instance to manage your authentication
  // For example, you could call magic.auth.loginWithMagicLink() to log the user in
  // and magic.user.getMetadata() to get the user data
  // Remember to call setUser with the user data once you have it

  return (
    <AuthContext.Provider
      value={{
        user,
        magic,
        loggedIn,
        magicLoaded,
        setNotLoggedInInfo,
        setLoggedIn,
        web3,
        web3Loaded,
      }}
    >
      <SocketDisconnectedPopUp
        socketDisconnectedPopUp={socketDisconnectedPopUp}
        setSocketDisconnectedPopUp={setSocketDisconnectedPopUp}
      />
      <NotLoggedInInfo
        notLoggedInInfo={notLoggedInInfo}
        setNotLoggedInInfo={setNotLoggedInInfo}
      />
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
