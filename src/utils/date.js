export function formattingDate(time) {
	const date = new Date(time);
	const year = "0" + date.getYear();
	const month = "0" + (date.getMonth() + 1);
	const day = "0" + date.getDate();
	const hours = "0" + date.getHours();
	const minutes = "0" + date.getMinutes();

	return day.substr(-2) + '/' + month.substr(-2) + '/' + year.substr(-2) + ', ' +
		hours.substr(-2) + ':' + minutes.substr(-2);
}