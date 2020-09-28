import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "../user-panel/user-panel.component";
import Channels from "../channels/channels.component";

const SidePanel = () => {
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
		</Menu>
	);
};

export default SidePanel;