import {UPDATE_SEED, UPDATE_ADDRESSES_INFO} from './actionTypes';

export const initialState = {
	seed: '',
	addressesInfo: [],
};

export const walletReducer = (state = initialState, {type, payload} = {}) => {
	switch (type) {
		case UPDATE_SEED:
			return {
				...state,
				seed: payload,
			};
		case UPDATE_ADDRESSES_INFO:
			return {
				...state,
				addressesInfo: payload,
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};