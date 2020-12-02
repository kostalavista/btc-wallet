import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {generateAddresses} from "../store/wallet/actions";
import {Table} from "antd";

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
	const dispatch = useDispatch();

	const addressesInfo = useSelector(state => state.walletReducer.addressesInfo);

	useEffect(() => {
		dispatch(generateAddresses());
	}, []);

	const columns = [
		{title: 'time', dataIndex: 'time', key: 'time'},
		{title: 'firstAddress', dataIndex: 'firstAddress', key: 'firstAddress'},
		{title: 'isIncoming', dataIndex: 'isIncoming', key: 'isIncoming'},
		{title: 'secondAddress', dataIndex: 'secondAddress', key: 'secondAddress'},
		{title: 'value', dataIndex: 'value', key: 'value'},
		{title: 'commission', dataIndex: 'commission', key: 'commission'},
	];

	const data = [];

	addressesInfo.forEach((addr) => {
		addr.transactions.forEach((transact, i) => {
			data.push({
				key: addr.address+i,
				time: transact.time,
				firstAddress: addr.address,
				isIncoming: transact.isIncoming,
				secondAddress: transact.secondAddress,
				value: transact.value,
				commission: transact.commission,
			});
		});
	});

	return (
		<Styles>
			<div className="head">Transactions</div>
			<Table columns={columns} dataSource={data}/>

		</Styles>
	);
};

export default Transactions;