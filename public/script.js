
/* Configure Ethereum provider */
const magic = new Magic("pk_live_920E75807BBA55A6", {
	network: {
		rpcUrl: "https://rpc.sx.technology",
		chainId: 416
	},
});
const web3 = new Web3(magic.rpcProvider);

const localhost_api = "http://localhost:3001";
const server_api = "https://titanecho-backend.onrender.com";

const serverUrl = server_api;

function login(){
	const email = $('.logininput').val();
	if (email) {
		magic.auth.loginWithMagicLink({ email }).then((didToken)=>{
			console.log('addrs valid')
			fetch(`${serverUrl}/user/login`, {
				headers: new Headers({
					Authorization: "Bearer " + didToken
				}),
				credentials:'include',
				withCredentials: true,
				method: "POST"
			}).then((data)=>{
				if (data.status) window.location = "/dashboard";
			}).catch((err)=>{
				console.log(err);
				alert("Failed to login. Please wait a short while and try again.");
			});
		});
	}
}

$('.loginbtn').click((e)=>{
	console.log('attempt login')
	e.preventDefault();
	login();
});