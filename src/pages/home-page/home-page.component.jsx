import React from "react";

// Styles
import { Grid } from "semantic-ui-react";
import "./home-page.styles.scss";

// Components
import ColorPanel from "../../components/color-panel/color-panel.component";
import SidePanel from "../../components/side-panel/side-panel.component";
import MetaPanel from "../../components/meta-panel/meta-panel.component";
import Messages from "../../components/messages/messages.component";

const Home = () => (
	<Grid columns="equal" className="Home" style={{ background: "#eee" }}>
		<ColorPanel />
		<SidePanel />

		<Grid.Column style={{ marginLeft: 320 }}>
			<Messages />
		</Grid.Column>

		<Grid.Column width={4}>
			<MetaPanel />
		</Grid.Column>
	</Grid>
);

export default Home;
