export function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	var currentMonth = year + '年' + month + '月'
	var data = {
		currentdate: currentdate,
		currentMonth: currentMonth
	}
	return data;
}

export function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}`;
}
export function getDateInterval(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1
	let startYear = year - 60
	let endYear = year + 2
	let dateInterval = []
	let indexInterval = []
	let yearDate = []
	let monthDate = []
	for(let i = 0; i < 63; i++){
		if(startYear + i == year){
			indexInterval.push(i)
		}
		yearDate.push(startYear + i + '年')
	}
	for(let i = 1; i <= 12; i++){
		if(i == month){
			indexInterval.push(i - 1)
		}
		i > 9 ? monthDate.push(i+'月') : monthDate.push('0' + i+'月')
	}
	dateInterval.push(yearDate)
	dateInterval.push(monthDate)
	if(type =='date'){
		return dateInterval;
	}else if(type == 'index'){
		return indexInterval;
	}
	
}