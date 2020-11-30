import React from 'react';
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import {Route} from "react-router-dom";
import Addresses from "./components/Addresses";
import Transactions from "./components/Transactions";

const Styles = styled.div`
	display: flex;
	align-items: flex-start;
	height: 100%;
	.content {
		width: calc(100% - 200px)
	}
`;

const App = () => {
	return (
		<Styles>
			<Sidebar/>
			<div className="content">
				<Route exact path="/" component={Addresses}/>
				<Route path="/transactions" component={Transactions}/>
			</div>
		</Styles>
	);
};

export default App;