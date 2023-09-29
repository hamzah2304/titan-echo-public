
export async function testSignAndPost(user,web3){
	// salt fix random number toBigInt
	console.log(web3)
	let unprefixedAddr = '0xdcf93397d5dc4803033770a9022263951ddfe3e0d552cf553135092e446f4d76'.substring(2);
	let paddedAddr = unprefixedAddr.padStart(64,'0');
	let order = {
		marketHash:paddedAddr,
		maker: user.publicAddress,
		totalBetSize: web3.utils.toBigInt(10 * math.pow(10, 6)).toString(), // USDC notional * 10^6
		percentageOdds: web3.utils.toBigInt(5 * math.pow(10, 18)).toString(), // Need to convert here, this gives taker odds of 90%
		baseToken: "0xe2aa35C2039Bd0Ff196A6Ef99523CC0D3972ae3e",
		apiExpiry: 1689067800 - 300,
		expiry: 2209006800,
		executor: "0x52adf738AAD93c31f798a30b2C74D658e1E9a562",
		isMakerBettingOutcomeOne: true,
		salt: web3.utils.toBigInt(12345).toString(),
	};
	
	console.log(order)
	let orderHash = web3.utils.soliditySha3(
		{ type: "bytes32", value: order.marketHash },
		{ type: "address", value: order.baseToken },
		{ type: "uint256", value: order.totalBetSize },
		{ type: "uint256", value: order.percentageOdds },
		{ type: "uint256", value: order.expiry },
		{ type: "uint256", value: order.salt },
		{ type: "address", value: order.maker },
		{ type: "address", value: order.executor },
		{ type: "bool", value: order.isMakerBettingOutcomeOne }
	);
	
	console.log(order)
	// Convert the hash to a Uint8Array
	let uint8ArrayOrderHash = hexToUint8Array(orderHash.slice(2))
	console.log('uint8ArrayOrderHash',uint8ArrayOrderHash)

	const messageHex = web3.utils.bytesToHex(uint8ArrayOrderHash);
	console.log('messageHex',messageHex)
	let signature = await web3.eth.sign(messageHex, user.publicAddress);
	console.log('signature',signature)

	const signedOrder = { ...order, signature };

	console.log(JSON.stringify({ orders: [signedOrder] }))
	
	let result = await fetch("https://api.sx.bet/orders/new", {
		method: "POST",
		body: JSON.stringify({ orders: [signedOrder] }),
		headers: { "Content-Type": "application/json" },
	});
	
	console.log('result',result);
	if (result.status === 200) {
		console.log('Order submitted successfully.');
	} else {
		console.error(`Error submitting order. Status: ${result.status}, Status Text: ${result.statusText}`);
	}
}

export async function testSignAndCancel(user,web3){
	let orderHashHex = web3.utils.bytesToHex(new Uint8Array([
		32,  24,  67, 80, 201,   3,  98,  71,
		152, 249, 163, 76, 144, 193,  50, 206,
		244, 218, 243, 95, 124,  41,  53,  55,
		213,  87, 142, 48, 210, 111, 231, 137
	]));
	
	let orderHashes = [orderHashHex];

	// const salt = '0x'+web3.utils.toBigInt(12345).toString();
	const salt = '0x123456';
	console.log(salt);
	// const timestamp = Math.floor(new Date().getTime() / 1000);
	const timestamp = 16880000000;
	const chainId = 416;

	console.log(orderHashHex,salt,timestamp,chainId);

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

	web3.currentProvider.send(
		{
		  method: 'eth_signTypedData_v4',
		  params: [user.publicAddress, JSON.stringify(payload)],
		  from: user.publicAddress,
		},
		function(err, result) {
			if (err) {
				return console.error(err);
			}
			let signature = result.result;
			console.log('User Signature: ', signature);
			// const apiPayload = {
			// 	signature,
			// 	orderHashes,
			// 	salt,
			// 	maker: user.publicAddress,
			// 	timestamp,
			// };
			// console.log(apiPayload);
		
			// fetch("https://api.sx.bet/orders/cancel/v2", {
			// 	method: "POST",
			// 	body: JSON.stringify(apiPayload),
			// 	headers: { "Content-Type": "application/json" },
			// }).then((result) => {
			// 	console.log(result)
			// });
		}
	  );
}