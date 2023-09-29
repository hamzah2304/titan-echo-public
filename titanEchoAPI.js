
const localhost_server = "http://localhost:3001";
const prod_server = "https://titanecho-backend.onrender.com";

const localhost_api = localhost_server + "/user/api/";
const server_api = prod_server + "/user/api/";

const localhost_logout = localhost_server + "/user/logout";
const server_logout = prod_server + "/user/logout";

const api_string = server_api;
const logout_string = server_logout;

function getTitanEchoApi(query,callback,params=''){
	return fetch(api_string + query + params,{
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials:'include',
	})
	.then(function (res) {
		return res.text();
	})
	.then(function (data) {
		try {
			callback(JSON.parse(data));
		} catch (e) {
			console.log(e);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

function postTitanEchoApi(query,callback,body){
	return fetch(api_string + query,{
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials:'include',
		body: JSON.stringify(body)
	})
	.then(function (res) {
		return res.text();
	})
	.then(function (data) {
		try {
			callback(JSON.parse(data));
		} catch (e) {
			console.log(e);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

export function getTest() {
	getTitanEchoApi("test",(data)=>{console.log(data.success)});
}

export function getAllLeagues(callback) {
	return getTitanEchoApi("getAllLeagues",callback);
}

export function getMarketsGivenSports(sportIds,callback) {
	return getTitanEchoApi("getMarketsGivenSports",callback,'?sportIds='+sportIds.toString());
}


export function postCreateStrategy(strategy,callback) {
	return postTitanEchoApi("createStrategy",callback,{"strategy":strategy});
}

export function postRemoveStrategy(stratId,callback) {
	return postTitanEchoApi("removeStrategy",callback,{"stratId":stratId});
}

export function getUserStrategies(userAddr, callback) {
	return getTitanEchoApi("getUserStrategies",callback,'?userAddr='+userAddr.toString());
}

export function getUserCommittedNotional(userAddr, callback) {
	return getTitanEchoApi("getUserCommittedNotional",callback,'?userAddr='+userAddr.toString());
}

export function getSpecificMarket(marketHash, callback){
	return getTitanEchoApi("getSpecificMarket",callback,'?marketHash='+marketHash.toString());
}

export function postDeleteAllOrders(callback){
	return postTitanEchoApi("deleteAllOrders",callback,{});
}

export function logout(magic){
	fetch(logout_string, { 
		method: "POST",
		credentials:'include',
		withCredentials: true,
	}).then(function (res) {
		return res.text();
	})
	.then(function (data) {
		try {
			let jsondata = JSON.parse(data);
			console.log(jsondata);
			if (jsondata.success){
				console.log('server initially logged in - success (no longer)');
				magic.user.isLoggedIn().then((res)=>{
					console.log('client logged in',res);
					window.location = "/";
				});
			} else {
				console.log('only client side was logged in')
				magic.user.logout().then((res)=>{
					console.log('client logged out attempted');
					magic.user.isLoggedIn().then((logres)=>{
						console.log('client logged in',logres);
						window.location = "/";
					});
				})
			}
			// magic.user.isLoggedIn().then((res)=>{
			// 	console.log(res);
			// 	// if (data.status) window.location = "/";
			// });
		} catch (e) {
			console.log(e);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}