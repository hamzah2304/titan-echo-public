import { useState, useEffect } from "react";
import Web3 from "web3";

export default function EthTipJar() {
  const [hasEthAccount, setHasEthAccount] = useState(false);
  const [ethAmount, setEthAmount] = useState("0.00063");
  const [isValidKeyPress, setIsValidKeyPress] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);

  const web3 = new Web3(Web3.givenProvider);
  //   const web3 = new Web3(Web3.currentProvider);

  //   const results = {
  //     web3: web3,
  //   };

  //   console.log(results);
  //   console.log("Injected web3 detected.");
  const receivingAccount = "0x95a054600c5C1dE2D9ABE233047207F920B9671F"; // HM titan echo test

  useEffect(() => {
    if (window.ethereum) {
      setHasEthAccount(true);
    }
  }, []);

  const validateInput = (event) => {
    if (event.keyCode < 65 || event.keyCode > 90) {
      console.log("input was not alpha");
      setIsValidKeyPress(true);
    } else {
      setIsValidKeyPress(false);
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 2000);
    }
  };

  const handleSend = async function (e) {
    e.preventDefault();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(ethAmount);
    console.log("ethAmount type", typeof ethAmount);
    const wei = web3.utils.toWei(ethAmount, "ether");
    const weiBN = web3.utils.toBigInt(wei);
    // console.log(wei);
    // console.log("wei type", typeof wei);
    // console.log(weiBN);
    // console.log("wei type", typeof weiBN);
    const hexValue = web3.utils.toHex(weiBN);
    // console.log(hexValue);
    if (accounts.length > 0) {
      window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: receivingAccount,
            // value: web3.utils.toHex(wei),
            value: hexValue,
          },
        ],
      });
    }
  };

  const changeNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(1) }],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {hasEthAccount && isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.375rem",
            background: "linear-gradient(90deg, rgba(45, 55, 72,0.4), rgba(26, 32, 44,0.4), rgba(0, 0, 0,0.4))",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 10px",
            border: "rgba(255,255,255,0.2) 1px solid"
          }}
        >
          <button
              onClick={() => setIsVisible(false)}
              style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'transparent',
                  border: 'none',
                  color: '#FFF',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
              }}
          >
            &times;
          </button>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#FFF",
              padding: "1.25rem",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {displayError ? (
              <label
                style={{
                  fontSize: "1.25rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.75rem",
                  textAlign: "center",
                }}
              >
                Only numbers are permitted.
              </label>
            ) : (
              <>
              <h3
                style={{
                  fontSize: "18.72px",
                  paddingTop: "5px",
                  paddingBottom: "16px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                <span style={{opacity:0.6}}>Please</span> support<span style={{opacity:0.6}}>, send</span> ETH<span style={{opacity:0.6}}>.</span>
              </h3>
              <label
                style={{
                  fontSize: "16px",
                  paddingBottom: "0.75rem",
                  textAlign: "center"
                }}
              >
                <span style={{opacity:0.9}}><span style={{opacity:0.6}}>$</span>1</span><span style={{opacity:0.6}}> ~ </span><span style={{opacity:0.9}}>0.00063</span><span style={{opacity:0.6}}> eth</span> 
              </label>
              </>
            )}
            <div
              style={{
                padding: "0.75rem 0",
                fontSize: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                minWidth: "300px"
              }}
            >
              <input
                onKeyDown={(event) => validateInput(event)}
                onKeyUp={() => setIsValidKeyPress(false)}
                onChange={(event) => {
                  if (isValidKeyPress) {
                    setEthAmount(event.target.value.toString());
                    setIsValidKeyPress(false);
                  } else {
                    console.log("keypress was not valid", event.target.value);
                  }
                }}
                type="number"
                value={ethAmount}
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  background: "rgba(184,211,255,0.1)",
                  width: "100%",
                  borderRadius: "0.375rem",
                  appearance: "none",
                  fontSize: "1.2rem",
                  outline: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
              <span style={{
                padding: "10px",
                verticalAlign: "middle",
                paddingRight: "12px",
                opacity: 0.6,
                marginLeft: "-100px",
                fontSize: "18px"
              }}>
                ETH
              </span>
            </div>
            <button
              style={{
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
                fontWeight: "600",
                letterSpacing: "0.05em",
                color: "#FFF",
                background: "linear-gradient(90deg, rgba(83,130,201,0.5) 40%, rgba(57, 132, 219, 0.5))",
                fontFamily: "Montserrat, sans-serif", 
                border: "none",
                cursor: "pointer",
                height:"42px",
                pointerEvent: "none",
              }}
              onClick={(e) => {
                changeNetwork();
                handleSend(e);
              }}
            >
              Send Tip
            </button>
          </form>
        </div>
      )}
    </>
  );
}
