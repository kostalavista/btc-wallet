import React, {useEffect} from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {addAddress, generateAddresses} from "../store/wallet/actions";
import {useDispatch, useSelector} from "react-redux";
import {Table, Tag, Space} from 'antd';

const Styles = styled.div`
	.head {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
		padding: 10px;
		text-transform: uppercase;
	}
	.seed {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		.seed__title {
			font-weight: bold;
			padding-left: 20px;
		}
		.seed__value {
			margin: 0 20px;
		}
	}
	.address-action {
		margin-top: 20px;
	}
`;

const Addresses = () => {
	const dispatch = useDispatch();

	const addresses = useSelector(state => state.walletReducer.addresses);
	const seed = useSelector(state => state.walletReducer.seed);

	useEffect(() => {
		dispatch(generateAddresses());
	}, []);

	const columns = [
		{title: 'Address', dataIndex: 'address', key: 'address'},
		{title: 'Balance', dataIndex: 'balance', key: 'balance'},
	];

	const data = addresses.map((addr, i) => {
		return {
			key: i,
			address: addr,
			balance: 42,
		};
	});

	return (
		<Styles>
			<div className="head">Addresses</div>
			{seed &&
			<div className="seed">
				<div className="seed__title">Seed:</div>
				<div className="seed__value">{seed}</div>
			</div>
			}
			<Table columns={columns} dataSource={data} pagination={false}/>
			<div className="address-action">
				<Button type="primary" onClick={() => dispatch(addAddress())}>Add address</Button>
			</div>
		</Styles>
	);
};

export default Addresses;