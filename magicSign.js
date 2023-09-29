const math = require("mathjs");

//////////// GET ODDS

// titan_o will be an array length 2
function getOdds(titan_o, executeSides, notional, margin, shade) {
  let minAllocate = 0;
  if (executeSides.left) minAllocate += 1;
  if (executeSides.right) minAllocate += 1;
  // console.log(notional)
  // console.log(minAllocate)
  if (12 * minAllocate > notional) {
    throw new Error(
      "Notional is not large enough to allocate at least $12 to each order"
    );
  }

  let titan_o_sum = math.sum(titan_o);
  let titan_o_normalized = titan_o.map((x) => (100 * x) / titan_o_sum);
  titan_o_normalized[0] = Math.min(
    100,
    Math.max(0, titan_o_normalized[0] + shade)
  );
  titan_o_normalized[titan_o_normalized.length - 1] = Math.min(
    100,
    Math.max(0, titan_o_normalized[titan_o_normalized.length - 1] - shade)
  );
  let o_offer = titan_o_normalized.map((x) =>
    Math.min(100, Math.max(0, (1 + margin / 100) * x))
  );

  titan_o_normalized = titan_o_normalized.map((x) => (x * notional) / 100);

  let iteration = 0;
  while (
    (executeSides.left && titan_o_normalized[0] < 12 && iteration < 11) ||
    (executeSides.right && titan_o_normalized[1] < 12 && iteration < 11)
  ) {
    iteration += 1;
    if (iteration == 10) {
      // console.log('loose')
    } else {
      // console.log(iteration)
      let minIndex = titan_o_normalized.indexOf(
        Math.min(...titan_o_normalized)
      );
      titan_o_normalized[minIndex] += 1;
      for (let i = 0; i < titan_o_normalized.length; i++) {
        if (i !== minIndex) {
          titan_o_normalized[i] -= 1 / (titan_o_normalized.length - 1);
        }
      }
      // console.log(titan_o_normalized,Math.min(...titan_o_normalized), ' >= ', 12)
    }
  }

  o_offer = o_offer.map((x) => Math.round(x / 0.25) * 0.25); // Rounding odds to nearest 0.25
  titan_o_normalized = titan_o_normalized.map((x) => Math.round(x)); // Rounding volume to nearest integer

  let result = {
    odds: o_offer,
    volumes: titan_o_normalized,
  };
  return result;
}

function getOddsOld(titan_o, executeSides, notional, margin, shade) {
  console.log("titan_o", titan_o);
  console.log("notional", notional);
  let minAllocate = 0;
  if (executeSides.left) minAllocate += 1;
  if (executeSides.right) minAllocate += 1;
  if (12 * minAllocate > notional) {
    throw new Error(
      "Notional is not large enough to allocate at least $12 to each order"
    );
  }

  let titan_o_sum = math.sum(titan_o);
  let titan_o_normalized = titan_o.map((x) => (100 * x) / titan_o_sum);
  titan_o_normalized[0] = Math.min(
    100,
    Math.max(0, titan_o_normalized[0] + shade)
  );
  titan_o_normalized[titan_o_normalized.length - 1] = Math.min(
    100,
    Math.max(0, titan_o_normalized[titan_o_normalized.length - 1] - shade)
  );
  let o_offer = titan_o_normalized.map((x) =>
    Math.min(100, Math.max(0, (1 + margin / 100) * x))
  );

  titan_o_normalized = titan_o_normalized.map((x) => (x * notional) / 100);

  let iterNum = 0;
  while (
    (executeSides.left && titan_o_normalized[0] < 12) ||
    (executeSides.right && titan_o_normalized[1] < 12)
  ) {
    iterNum += 1;
    if (iterNum > 50) break;
    let minIndex = titan_o_normalized.indexOf(Math.min(...titan_o_normalized));
    titan_o_normalized[minIndex] += 1;
    for (let i = 0; i < titan_o_normalized.length; i++) {
      if (i !== minIndex) {
        titan_o_normalized[i] -= 1 / (titan_o_normalized.length - 1);
      }
    }
    // console.log(
    //   titan_o_normalized,
    //   Math.min(...titan_o_normalized),
    //   " >= ",
    //   12
    // );
  }

  console.log("titan_o_normalized", titan_o_normalized);

  let result = {
    odds: o_offer,
    volumes: titan_o_normalized,
  };
  return result;
}

//////////// POST NEW ORDER

function createPostOrderObjects(publicAddress, web3, data_to_construct_order) {
  let marketHash = data_to_construct_order["marketHash"];
  // let titanPercentageOdds = data_to_construct_order["titanPercentageOdds"];
  let strategy = data_to_construct_order["strategy"];
  let executeSides = data_to_construct_order["executeSides"];
  let oddsSides = data_to_construct_order["oddsSides"];

  let remainingNotional = strategy["markets"][marketHash]["remaining"];
  let potentialNotional = strategy["markets"][marketHash]["potential"];
  if (potentialNotional < 24) {
    throw new Error("Not enough notional to continue with strategy");
  }

  let margin = strategy["markets"][marketHash]["margin"];
  let shade = strategy["markets"][marketHash]["shade"];
  let gameTime = strategy["markets"][marketHash]["gameTime"];

  // console.log(oddsSides);
  let oddsArray = [oddsSides.left, oddsSides.right];
  // hardcode fixed titanPercentageOdds for now _ TODO: FIX
  // let titanPercentageOdds = [1000000000000000000,1000000000000000000]
  let initOdds = math.map(oddsArray, (element) =>
    math.subtract(100, math.divide(element, math.pow(10, 18)))
  );
  // let result = math.map(oddsSides, (element) =>
  // 	math.subtract(100, math.divide(element, math.pow(10, 18)))
  // );
  // console.log("initOdds", initOdds);

  let oddsresult = getOdds(
    initOdds,
    executeSides,
    remainingNotional,
    margin,
    shade
  );
  // console.log("getOdds", oddsresult);

  let result = {};
  result.odds = math.map(oddsresult.odds, (element) => {
    return Math.round((100 - parseFloat(element).toFixed(4)) * 4) / 4;
  }); // Ensure odds on ladder
  for (let i = 0; i < result.odds.length; i++) {
    if (result.odds[i] <= 0) {
      result.odds[i] = 1;
      console.log("odds increased from 0 to 1");
    }
    if (result.odds[i] >= 100) {
      result.odds[i] = 99;
      console.log("odds decreased 100 to 99");
    }
  }

  result.volumes = math.map(oddsresult.volumes, (element) =>
    Math.round(element)
  );

  if (
    result.volumes.length == 2 &&
    result.volumes[0] + result.volumes[1] > remainingNotional
  ) {
    if (result.volumes[0] > result.volumes[1])
      result.volumes[0] = remainingNotional - result.volumes[1];
    else result.volumes[1] = remainingNotional - result.volumes[0];
  }

  console.log("odds & volumes", result);

  let orders = {};

  if (executeSides["left"] && oddsSides["left"] != 0) {
    const order1 = {
      marketHash: marketHash,
      maker: publicAddress,
      totalBetSize: web3.utils
        .toBigInt(result.volumes[0] * math.pow(10, 6))
        .toString(), // USDC notional * 10^6
      percentageOdds: web3.utils
        .toBigInt(result.odds[0] * math.pow(10, 18))
        .toString(), // Need to convert here, this gives taker odds of 90%
      baseToken: "0xe2aa35C2039Bd0Ff196A6Ef99523CC0D3972ae3e",
      apiExpiry: gameTime - 300,
      expiry: 2209006800,
      executor: "0x52adf738AAD93c31f798a30b2C74D658e1E9a562",
      isMakerBettingOutcomeOne: true,
      salt: web3.utils
        .toBigInt(Math.floor(Math.random() * 10000000000))
        .toString(),
    };

    orders["order1"] = order1;
  }

  if (executeSides["right"] && oddsSides["right"] != 0) {
    const order2 = {
      marketHash: marketHash,
      maker: publicAddress,
      totalBetSize: web3.utils
        .toBigInt(result.volumes[1] * math.pow(10, 6))
        .toString(), // USDC notional * 10^6
      percentageOdds: web3.utils
        .toBigInt(result.odds[1] * math.pow(10, 18))
        .toString(), // Need to convert here, this gives taker odds of 90%
      baseToken: "0xe2aa35C2039Bd0Ff196A6Ef99523CC0D3972ae3e",
      apiExpiry: gameTime - 300,
      expiry: 2209006800,
      executor: "0x52adf738AAD93c31f798a30b2C74D658e1E9a562",
      isMakerBettingOutcomeOne: false,
      salt: web3.utils
        .toBigInt(Math.floor(Math.random() * 10000000000))
        .toString(),
    };

    orders["order2"] = order2;
  }

  return orders;
}

function hexToUint8Array(hexString) {
  return new Uint8Array(
    (hexString.match(/[\da-f]{2}/gi) || []).map(function (h) {
      return parseInt(h, 16);
    })
  );
}

async function signPostOrderPair(publicAddress, web3, orders) {
  let signatures = {};

  for (let id of Object.keys(orders)) {
    let order = orders[id];
    console.log(order);

    // bytes32 needs to be validated as int by Web3 validator,
    // so use padded, unprefixed marketHash in soliditySha3 function
    // but keep the original hex marketHash in the order object
    let unprefixedMarketHash = order.marketHash.substring(2);
    let paddedMarketHash = unprefixedMarketHash.padStart(64, "0");

    let orderHash = web3.utils.soliditySha3(
      { type: "bytes32", value: paddedMarketHash },
      { type: "address", value: order.baseToken },
      { type: "uint256", value: order.totalBetSize },
      { type: "uint256", value: order.percentageOdds },
      { type: "uint256", value: order.expiry },
      { type: "uint256", value: order.salt },
      { type: "address", value: order.maker },
      { type: "address", value: order.executor },
      { type: "bool", value: order.isMakerBettingOutcomeOne }
    );
    console.log(orderHash);

    // TODO:
    // CAN THE TWO BELOW STEPS BE REMOVED?
    // - is orderHash.slice(2) already correct form to be used in personal.sign?

    // Convert the hash to a Uint8Array
    let uint8ArrayOrderHash = hexToUint8Array(orderHash.slice(2));
    console.log("uint8ArrayOrderHash", uint8ArrayOrderHash);

    const messageHex = web3.utils.bytesToHex(uint8ArrayOrderHash);
    console.log("messageHex", messageHex);
    signatures[id] = await web3.eth.sign(messageHex, publicAddress);
    console.log("signature", id, signatures[id]);
  }
  return signatures;
}

async function postNewOrderToSX(orders, signatures) {
  // if two signatures weren't generated return false
  if (Object.keys(signatures).length != Object.keys(orders).length)
    return false;

  try {
    let successes = {};
    let orderHashes = {};
    for (let id of Object.keys(orders)) {
      let orderObj = {};
      for (let key of Object.keys(orders[id])) {
        orderObj[key] = orders[id][key];
      }
      orderObj["signature"] = signatures[id];
      // let signedOrder = { ...orders[id], signatures[id] };
      let signedOrder = orderObj;
      // let signedOrder = {};
      console.log(JSON.stringify({ orders: [signedOrder] }));

      let fetchresult = await fetch("https://api.sx.bet/orders/new", {
        method: "POST",
        body: JSON.stringify({ orders: [signedOrder] }),
        headers: { "Content-Type": "application/json" },
      });
      let fetchdata = await fetchresult.json();
      console.log(fetchdata);
      if (fetchdata.status == "success") {
        console.log("Order submitted successfully.");
        successes[id] = true;
        orderHashes[id] = fetchdata["data"]["orders"][0];
      } else {
        console.error(`Error submitting order. Message: ${fetchdata.message}`);
        successes[id] = false;
      }
    }

    let toreturn = {};
    if ("order1" in orders) toreturn["userOrderHash1"] = orderHashes["order1"];
    if ("order2" in orders) toreturn["userOrderHash2"] = orderHashes["order2"];

    if ("order1" in successes && "order2" in successes) {
      toreturn["success"] = successes["order1"] && successes["order2"];
    } else if ("order1" in successes && !("order2" in orders)) {
      toreturn["success"] = successes["order1"];
    } else if ("order2" in successes && !("order1" in orders)) {
      toreturn["success"] = successes["order2"];
    } else if (!("order1" in orders) && !("order2" in orders)) {
      toreturn["success"] = true;
    } else {
      toreturn["success"] = false;
    }

    return toreturn;
  } catch (err) {
    console.error(`Error submitting order: ${err.message}`);
    return { success: false };
  }
}

export async function magicAuthPostOrder(user, web3, data_to_construct_order) {
  console.log("magicAuthPostOrder");
  // try {
  let orders = createPostOrderObjects(
    user.publicAddress,
    web3,
    data_to_construct_order
  );
  console.log("orders: ", orders);
  let signatures = await signPostOrderPair(user.publicAddress, web3, orders);
  console.log("signatures: ", signatures);
  let posted = await postNewOrderToSX(orders, signatures);
  console.log("posted: ", posted);
  if (posted.success) {
    return posted;
  } else {
    return { success: false };
  }
  // }
  // catch (err) {
  //   console.error(`Error magicAuthPostOrder: ${err.message}`);
  //   return { success: false };
  // }
}

//////////// CANCEL CURRENT ORDERS

function createCancelOrderPayload(publicAddress, web3, orderHashes) {
  const chainId = 416;
  const saltstr = web3.utils
    .toBigInt(Math.floor(Math.random() * 10000000000))
    .toString();
  let salt = web3.utils.padRight(web3.utils.toHex(saltstr), 64);
  console.log(saltstr, web3.utils.toHex(saltstr), salt);
  let timestamp = Math.floor(Date.now() / 1000);
  // orderHashes is an array of hex's
  const payload = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "salt", type: "bytes32" },
      ],
      Details: [
        { name: "orderHashes", type: "string[]" },
        { name: "timestamp", type: "uint256" },
      ],
    },
    primaryType: "Details",
    domain: {
      name: "CancelOrderV2SportX",
      version: "1.0",
      chainId,
      salt,
    },
    message: { orderHashes, timestamp },
  };
  console.log(payload);
  return payload;
}

async function signCancelOrder(publicAddress, web3, payload) {
  try {
    return new Promise(async (resolve, reject) => {
      web3.currentProvider.send(
        {
          method: "eth_signTypedData_v4",
          params: [publicAddress, JSON.stringify(payload)],
          from: publicAddress,
        },
        function (err, result) {
          if (err) {
            console.error(`Error creating signature order: ${err.message}`);
            reject({ success: false });
          }
          let signature = result.result;
          let apiPayload = {
            signature,
            orderHashes: payload.message.orderHashes,
            salt: payload.domain.salt,
            maker: publicAddress,
            timestamp: payload.message.timestamp,
          };
          console.log("User Signature: ", signature);
          console.log("API Payload: ", apiPayload);
          resolve({ success: true, apiPayload: apiPayload });
        }
      );
    });
  } catch (err) {
    console.error(`Error creating signature order: ${err.message}`);
    return new Promise(async (resolve, reject) => {
      resolve({ success: false });
    });
  }
}

async function cancelCurrentOrderToSX(signatureObj) {
  console.log(signatureObj);
  // signature wasn't generated correctly return false
  if (!signatureObj.success) return false;

  try {
    console.log("try to send cancel orders to sx");
    let fetchresult = await fetch("https://api.sx.bet/orders/cancel/v2", {
      method: "POST",
      body: JSON.stringify(signatureObj.apiPayload),
      headers: { "Content-Type": "application/json" },
    });
    console.log(fetchresult);
    let fetchdata = await fetchresult.json();
    console.log(fetchdata);
    if (fetchdata.status === "success") {
      console.log("SUCCESS! orders are cancelled");
      return true;
    } else {
      console.error(
        `Error cancelling order. Status: ${fetchdata.status}, Status Text: ${fetchdata.statusText}`
      );
      console.error(fetchdata);
      return false;
    }
  } catch (err) {
    console.error(`Error submitting order: ${err.message}`);
    return false;
  }
}

export async function magicAuthCancelOrders(user, web3, userOrderHashes) {
  try {
    let payload = createCancelOrderPayload(
      user.publicAddress,
      web3,
      userOrderHashes
    );
    let signatureObj = await signCancelOrder(user.publicAddress, web3, payload);
    console.log(signatureObj);
    let success = await cancelCurrentOrderToSX(signatureObj);
    return { success: success };
  } catch (err) {
    console.error(`Error magicAuthCancelOrders: ${err}`);
    return { success: false };
  }
  return { success: false };
}

//////////// CANCEL ALL ORDERS

function createCancelAllOrdersPayload(web3) {
  const chainId = 416;
  const saltstr = web3.utils
    .toBigInt(Math.floor(Math.random() * 10000000000))
    .toString();
  let salt = web3.utils.padRight(web3.utils.toHex(saltstr), 64);
  console.log(saltstr, web3.utils.toHex(saltstr), salt);
  let timestamp = Math.floor(Date.now() / 1000);
  // orderHashes is an array of hex's
  const payload = {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "salt", type: "bytes32" },
      ],
      Details: [{ name: "timestamp", type: "uint256" }],
    },
    primaryType: "Details",
    domain: {
      name: "CancelAllOrdersSportX",
      version: "1.0",
      chainId,
      salt,
    },
    message: { timestamp },
  };
  console.log(payload);
  return payload;
}

async function signCancelAllOrders(publicAddress, web3, payload) {
  try {
    return new Promise(async (resolve, reject) => {
      web3.currentProvider.send(
        {
          method: "eth_signTypedData_v4",
          params: [publicAddress, JSON.stringify(payload)],
          from: publicAddress,
        },
        function (err, result) {
          if (err) {
            console.error(`Error creating signature order: ${err.message}`);
            reject({ success: false });
          }
          let signature = result.result;
          let apiPayload = {
            signature,
            // sportXeventId
            salt: payload.domain.salt,
            maker: publicAddress,
            timestamp: payload.message.timestamp,
          };
          console.log("User Signature: ", signature);
          console.log("API Payload: ", apiPayload);
          resolve({ success: true, apiPayload: apiPayload });
        }
      );
    });
  } catch (err) {
    console.error(`Error creating signature order: ${err.message}`);
    return new Promise(async (resolve, reject) => {
      resolve({ success: false });
    });
  }
}

async function cancelAllOrdersToSX(signatureObj) {
  console.log(signatureObj);
  // signature wasn't generated correctly return false
  if (!signatureObj.success) return false;

  try {
    console.log("try to send cancel all orders to sx");
    let fetchresult = await fetch("https://api.sx.bet/orders/cancel/all", {
      method: "POST",
      body: JSON.stringify(signatureObj.apiPayload),
      headers: { "Content-Type": "application/json" },
    });
    console.log(fetchresult);
    let fetchdata = await fetchresult.json();
    console.log(fetchdata);
    if (fetchdata.status === "success") {
      console.log("SUCCESS! all orders are cancelled");
      return true;
    } else {
      console.error(
        `Error cancelling order. Status: ${fetchdata.status}, Status Text: ${fetchdata.statusText}`
      );
      console.error(fetchdata);
      return false;
    }
  } catch (err) {
    console.error(`Error submitting order: ${err.message}`);
    return false;
  }
}

export async function magicAuthCancelAllOrders(user, web3) {
  try {
    console.log("attempting to cancel all orders");
    let payload = createCancelAllOrdersPayload(web3);
    let signatureObj = await signCancelAllOrders(
      user.publicAddress,
      web3,
      payload
    );
    console.log(signatureObj);
    let success = await cancelAllOrdersToSX(signatureObj);
    return { success: success };
  } catch (err) {
    console.error(`Error magicAuthCancelAllOrders: ${err}`);
    return { success: false };
  }
  return { success: false };
}
