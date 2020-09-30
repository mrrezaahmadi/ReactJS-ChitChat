import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

import { connect } from "react-redux";

import {
	setCurrentChannel,
	setPrivateChannel,
} from "../../redux/channel/channel.action";

class Favorites extends Component {
	state = {
		favoriteChannels: [],
		activeChannel: "",
	};

	setActiveChannel = (channel) => {
		this.setState({ activeChannel: channel.id });
	};

	changeChannel = (channel) => {
		this.setActiveChannel(channel);
		this.props.setCurrentChannel(channel);
		this.props.setPrivateChannel(false);
	};

	displayChannels = (favoriteChannels) =>
		favoriteChannels.length > 0 &&
		favoriteChannels.map((channel) => (
			<Menu.Item
				key={channel.id}
				onClick={() => this.changeChannel(channel)}
				name={channel.name}
				style={{ opacity: 0.7 }}
				active={channel.id === this.state.activeChannel}
			>
				# {channel.name}
			</Menu.Item>
		));

	render() {
		const { favoriteChannels } = this.state;

		return (
			<Menu.Menu className="menu">
				<Menu.Item>
					<span>
						<Icon name="star" /> FAVORITES
					</span>{" "}
					({favoriteChannels.length})
				</Menu.Item>
				{this.displayChannels(favoriteChannels)}
			</Menu.Menu>
		);
	}
}

// prettier-ignore
export default connect(null, { setCurrentChannel, setPrivateChannel })(Favorites);
