import {GENERATE_SEED} from './actionTypes';

export const initialState = {
};

export const walletReducer = (state = initialState, {type, payload} = {}) => {
	switch (type) {
		case GENERATE_SEED:
			return {
				...state,
			};

		case 'RESET':
			return initialState;
		default:
			return state;
	}
};