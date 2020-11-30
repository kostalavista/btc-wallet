import React, {useEffect, useState} from 'react';
import {Menu} from 'antd';
import 'antd/dist/antd.css';
import {ProfileOutlined, WalletOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
// import {hashHistory} from 'react-router'

const Styles = styled.div`
	width: 200px;
	height: 100%;
`;

const Sidebar = () => {
	const [pathname, setPathname] = useState(window.location.pathname);

	return (
		<Styles>
				<Menu mode="inline" style={{height: '100%'}} selectedKeys={[pathname]}>
					<Menu.Item key="/" icon={<WalletOutlined/>} onClick={() => setPathname('/')}>
						<NavLink to='/'>Addresses</NavLink>
					</Menu.Item>
					<Menu.Item key="/transactions" icon={<ProfileOutlined/>} onClick={() => setPathname('/transactions')}>
						<NavLink to='/transactions' className="item sub-item">Transactions</NavLink>
					</Menu.Item>
				</Menu>
		</Styles>
	);
};

export default Sidebar;