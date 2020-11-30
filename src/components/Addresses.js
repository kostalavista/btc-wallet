import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {generateSeed} from "../store/wallet/actions";

const Styles = styled.div`
	.head {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 10px;
		text-transform: uppercase;
	}
`;

const Addresses = () => {
	return (
		<Styles>
			<div className="head">Addresses</div>
			<Button type="primary" onClick={generateSeed}>Generate</Button>
			<Button>Recover</Button>
		</Styles>
	);
};

export default Addresses;