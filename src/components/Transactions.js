import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
	.head {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 10px;
		text-transform: uppercase;
	}
`;

const Transactions = () => {
	return (
		<Styles>
			<div className="head">Transactions</div>

		</Styles>
	);
};

export default Transactions;