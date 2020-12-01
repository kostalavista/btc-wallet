import {GENERATE_SEED, UPDATE_SEED} from './actionTypes';

export const initialState = {
	seed: '',
	addresses: [],
};

export const walletReducer = (state = initialState, {type, payload} = {}) => {
	switch (type) {
		case GENERATE_SEED:
			return {
				...state,
				addresses: payload,
			};
		case UPDATE_SEED:
			return {
				...state,
				seed: payload,
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};