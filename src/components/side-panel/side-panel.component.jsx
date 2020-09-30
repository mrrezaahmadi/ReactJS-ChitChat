import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "../user-panel/user-panel.component";
import Channels from "../channels/channels.component";
import DirectMessages from "../direct-messages/direct-messages.component";
import Favorites from '../favorite-channels/favorite-channels.component'

const SidePanel = ({ currentUser, primaryColor }) => {
	return (
		<Menu
			size="large"
			inverted
			fixed="left"
			vertical
			style={{ background: primaryColor, fontSize: "1.2rem" }}
		>
			<UserPanel primaryColor={primaryColor} currentUser={currentUser} />
			<Favorites currentUser={currentUser} />
			<Channels currentUser={currentUser} />
			<DirectMessages currentUser={currentUser} />
		</Menu>
	);
};

export default SidePanel;
