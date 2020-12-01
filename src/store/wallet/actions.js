import {GENERATE_SEED, UPDATE_SEED} from './actionTypes';
import {generateMnemonic, mnemonicToSeedSync} from 'bip39';
import {countAddressesDefault} from "../../config";

const bitcoin = require('bitcoinjs-lib');
const bip32utils = require('bip32-utils');

const generateAddressesSuccess = data => ({
	type: GENERATE_SEED,
	payload: data
});

const updateSeed = data => ({
	type: UPDATE_SEED,
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

		dispatch(generateAddressesSuccess(addresses));
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