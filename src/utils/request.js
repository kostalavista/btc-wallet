import axios from 'axios';

export const request = (type, url, data) => {
	const config = {
		method: type.toLowerCase(),
		url,
		data: JSON.stringify(data)
	};

	return axios(config).then(({data}) => data).catch(err => {
		console.log('err', err);
	});
};