import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {generateAddresses} from "../store/wallet/actions";
import {formattingDate} from "../utils/date";
import 'antd/dist/antd.css';
import {Table, Tag} from 'antd';

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
	}, [dispatch]);

	const columns = [
		{title: 'Time', dataIndex: 'time', key: 'time'},
		{title: 'Address', dataIndex: 'firstAddress', key: 'firstAddress'},
		{
			title: 'Type', dataIndex: 'type', key: 'type',
			render: (type) => (
				<Tag color={type ? 'green' : 'volcano'} key={type}>{type ? 'Incoming' : 'Outgoing'}</Tag>
			),
		},
		{title: 'Second Address', dataIndex: 'secondAddress', key: 'secondAddress'},
		{title: 'Value', dataIndex: 'value', key: 'value'},
		{title: 'Commission', dataIndex: 'commission', key: 'commission'},
	];

	const data = [];

	addressesInfo.forEach((addr) => {
		addr.transactions.forEach((transact, i) => {
			data.push({
				key: addr.address + i,
				time: formattingDate(transact.time),
				firstAddress: addr.address,
				type: transact.isIncoming,
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