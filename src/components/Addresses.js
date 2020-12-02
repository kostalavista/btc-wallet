import React, {useEffect} from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import {addAddress, generateAddresses} from "../store/wallet/actions";
import {useDispatch, useSelector} from "react-redux";
import {Table} from 'antd';
import { useHistory } from "react-router-dom";

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
		margin-bottom: 20px;
	}
	.ant-table-row {
		cursor: pointer;
	}
`;

const Addresses = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const routeChange = (address) =>{
		history.push(`address-info/${address}`);
	};

	const addressesInfo = useSelector(state => state.walletReducer.addressesInfo);
	const seed = useSelector(state => state.walletReducer.seed);

	useEffect(() => {
		dispatch(generateAddresses());
	}, [dispatch]);

	const columns = [
		{title: 'Address', dataIndex: 'address', key: 'address'},
		{title: 'Balance', dataIndex: 'balance', key: 'balance'},
	];

	const data = addressesInfo.map((addr, i) => {
		return {
			key: i,
			address: addr.address,
			balance: addr.balance,
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
			<div className="address-action">
				<Button type="primary" onClick={() => dispatch(addAddress())}>Add address</Button>
			</div>
			<Table columns={columns} dataSource={data} pagination={false} onRow={(r) => ({
				onClick: () => routeChange(r.address),
			})}/>
		</Styles>
	);
};

export default Addresses;