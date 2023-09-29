	
function ordinal(d) {
	if (d > 3 && d < 21) return d.toString()+"th";
	switch (d % 10) {
		case 1:  return d.toString()+"st";
		case 2:  return d.toString()+"nd";
		case 3:  return d.toString()+"rd";
		default: return d.toString()+"th";
	}
}
export function startDate(gametime){
	return (new Date(gametime*1000).toLocaleDateString("en-US",{month:"short"})+' '+ordinal(new Date(gametime*1000).getDate())).toString();
}