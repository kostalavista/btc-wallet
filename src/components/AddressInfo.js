import React, {useEffect} from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {Tag} from 'antd';
import {getAddressInfo} from "../store/wallet/actions";
import {useDispatch, useSelector} from "react-redux";
import {Table} from 'antd';
import {formattingDate} from "../utils/date";

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

const AddressInfo = (props) => {
	const address = props.match.params.address;
	const dispatch = useDispatch();

	const addressInfo = useSelector(state => state.walletReducer.addressInfo);
	console.log(addressInfo)
	useEffect(() => {
		if (address) dispatch(getAddressInfo(address));
	}, [address, dispatch]);

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

	if (addressInfo.transactions) {
		addressInfo.transactions.forEach((transact, i) => {
			data.push({
				key: address + i,
				time: formattingDate(transact.time),
				firstAddress: address,
				type: transact.isIncoming,
				secondAddress: transact.secondAddress,
				value: transact.value,
				commission: transact.commission,
			});
		});
	}

	return (
		<Styles>
			<div className="head">{address}</div>
			<Table columns={columns} dataSource={data} pagination={false}/>
		</Styles>
	);
};

export default AddressInfo;