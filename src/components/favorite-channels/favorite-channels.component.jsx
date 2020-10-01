import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase/firebase.config";

import { connect } from "react-redux";

import {
	setCurrentChannel,
	setPrivateChannel,
} from "../../redux/channel/channel.action";

class Favorites extends Component {
	state = {
		user: this.props.currentUser,
		usersRef: firebase.database().ref("users"),
		favoriteChannels: [],
		activeChannel: "",
	};

	componentDidMount() {
		if (this.state.user) {
			this.addListeners(this.state.user.uid);
		}
	}

	componentWillUnmount() {
		this.removeListener();
	}

	removeListener = () => {
		this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
	};

	addListeners = (userId) => {
		this.state.usersRef
			.child(userId)
			.child("starred")
			.on("child_added", (snap) => {
				const favoriteChannel = { id: snap.key, ...snap.val() };
				this.setState({
					favoriteChannels: [...this.state.favoriteChannels, favoriteChannel],
				});
			});

		this.state.usersRef
			.child(userId)
			.child("starred")
			.on("child_removed", (snap) => {
				const channelToRemove = { id: snap.key, ...snap.val() };
				const filteredChannels = this.state.favoriteChannels.filter(
					(channel) => {
						return channel.id !== channelToRemove.id;
					}
				);

				this.setState({ favoriteChannels: filteredChannels });
			});
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
