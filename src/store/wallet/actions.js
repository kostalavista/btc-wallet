import {GENERATE_SEED} from './actionTypes';
import {generateMnemonic, mnemonicToSeedSync, mnemonicToSeed} from 'bip39';
import * as bip32 from 'bip32';
const bitcoin = require('bitcoinjs-lib');
let bip32utils = require('bip32-utils')

const generateSeedSuccess = data => ({
	type: GENERATE_SEED,
	payload: data
});

export const generateSeed = () => {
	// const mnemonic = generateMnemonic();
	const mnemonic = 'globe grunt okay luggage giggle faint face quantum inhale hill priority velvet';
	const seedHex = mnemonicToSeedSync(mnemonic).toString('hex');
	let m = bitcoin.HDNode.fromSeedHex(seedHex);
	let i = m.deriveHardened(0);
	let external = i.derive(0);
	let internal = i.derive(1);
	let account = new bip32utils.Account([
		new bip32utils.Chain(external.neutered()),
		new bip32utils.Chain(internal.neutered())
	]);

	//globe grunt okay luggage giggle faint face quantum inhale hill priority velvet
	// 16yv6QBJuVhuviknag7jZGh9tWRAmYkeBk
	// 1WmUwrCPPX4vFmhQwfphPi1YdNvhkQQLY
	// 1DRD1VfL1kBnp2XBok7HGtdCYKokJ5b2Ar

	console.log(account.getChainAddress(0));
	account.nextChainAddress(0)
	console.log(account.getChainAddress(1))
	console.log(account.nextChainAddress(1))

};

export const getAddresses = (count) => {

};