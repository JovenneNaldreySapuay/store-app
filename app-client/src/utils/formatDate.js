const formatDate = (datePosted) => {
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
	const createdTime = new Date(datePosted);
	const getMonth = monthNames[createdTime.getMonth()]; 
	const getDay = createdTime.getDate();
	const getYear = createdTime.getFullYear();
	// let getHour = createdTime.getHours();
	// let getMin = createdTime.getMinutes();
	// const ampm = getHour >= 12 ? 'PM' : 'AM';
	// getHour = getHour % 12;
	// getHour = getHour ? getHour : 12; 
	// getMin = getMin < 10 ? '0' + getMin : getMin;
	// const createdTimeZone = `${getMonth} ${getDay}, ${getYear}`;
	
	return `${getMonth} ${getDay}, ${getYear}`;
}

export default formatDate;