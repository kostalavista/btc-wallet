import {UPDATE_SEED, UPDATE_ADDRESSES_INFO} from './actionTypes';
import {generateMnemonic, mnemonicToSeedSync} from 'bip39';
import {API_URL, countAddressesDefault} from "../../config";
import {request} from "../../utils/request";

const bitcoin = require('bitcoinjs-lib');
const bip32utils = require('bip32-utils');

const updateSeed = data => ({
	type: UPDATE_SEED,
	payload: data
});

const updateAddressInfo = data => ({
	type: UPDATE_ADDRESSES_INFO,
	payload: data
});

export const generateAddresses = () => {
	return dispatch => {
		let mnemonic = localStorage.getItem('mnemonic');
		let addressesCount = localStorage.getItem('addressesCount');

		if (!mnemonic) {
			mnemonic = generateMnemonic();
			localStorage.setItem('mnemonic', mnemonic);
			dispatch(updateSeed(mnemonic));
		}

		if (!addressesCount) {
			addressesCount = countAddressesDefault;
			localStorage.setItem('addressesCount', addressesCount);
		}

		const seedHex = mnemonicToSeedSync(mnemonic).toString('hex');
		let hdNode = bitcoin.HDNode.fromSeedHex(seedHex);
		let chain = new bip32utils.Chain(hdNode);

		const addresses = [];

		for (let k = 0; k < +addressesCount; ++k) addresses.push(chain.next());

		dispatch(getAddressesInfo(addresses));
	}
};

export const addAddress = () => {
	return dispatch => {
		const addressesCount = +localStorage.getItem('addressesCount');
		const newAddressesCount = (addressesCount + 1).toString();

		localStorage.setItem('addressesCount', newAddressesCount);

		dispatch(generateAddresses());
	}
};

export const getAddressesInfo = (addresses) => {
	return dispatch => {
		request('GET', `${API_URL}/addresses/${addresses.join(',')}`).then(res => {
			dispatch(updateAddressInfo(res));
		});
	}
};