const formatDate = (d) => {
	const monthNames = [
		"Jan", 
		"Feb", 
		"Mar", 
		"Apr", 
		"May", 
		"Jun", 
		"Jul", 
		"Aug", 
		"Sep", 
		"Oct", 
		"Nov", 
		"Dec"
	];
	const createdTime = new Date(d);
	const getMonth = monthNames[createdTime.getMonth()]; 
	const getDay = createdTime.getDate();
	const getYear = createdTime.getFullYear();
	let getHour = createdTime.getHours();
	let getMin = createdTime.getMinutes();
	const ampm = getHour >= 12 ? 'PM' : 'AM';
	getHour = getHour % 12;
	getHour = getHour ? getHour : 12; 
	getMin = getMin < 10 ? '0' + getMin : getMin;
		
	return `${getMonth} ${getDay}, ${getYear} @ ${getHour}:${getMin} ${ampm}`;
}

export default formatDate;