import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from 'react-redux'

import UserPanel from "../user-panel/user-panel.component";
import Channels from "../channels/channels.component";
import DirectMessages from '../direct-messages/direct-messages.component'

const SidePanel = ({ currentUser }) => {
	return (
		<Menu
			size="large"
			inverted
			fixed="left"
			vertical
			style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
		>
			<UserPanel />
			<Channels />
			<DirectMessages currentUser={currentUser} />
		</Menu>
	);
};

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(SidePanel);
