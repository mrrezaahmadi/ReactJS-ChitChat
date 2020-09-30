import React from "react";
import { connect } from "react-redux";

// Styles
import { Grid } from "semantic-ui-react";
import "../../App.css";

// Components
import ColorPanel from "../../components/color-panel/color-panel.component";
import SidePanel from "../../components/side-panel/side-panel.component";
import MetaPanel from "../../components/meta-panel/meta-panel.component";
import Messages from "../../components/messages/messages.component";

const Home = ({ currentUser, currentChannel, isPrivateChannel }) => (
	<Grid columns="equal" className="app" style={{ background: "#eee" }}>
		<ColorPanel />
		<SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />

		<Grid.Column style={{ marginLeft: 320 }}>
			<Messages
				key={currentChannel && currentChannel.id}
				currentChannel={currentChannel}
				currentUser={currentUser}
				isPrivateChannel={isPrivateChannel}
			/>
		</Grid.Column>

		<Grid.Column width={4}>
			<MetaPanel key={currentChannel && currentChannel.id} isPrivateChannel={isPrivateChannel} />
		</Grid.Column>
	</Grid>
);

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
	isPrivateChannel: state.channel.isPrivateChannel,
});

export default connect(mapStateToProps)(Home);
