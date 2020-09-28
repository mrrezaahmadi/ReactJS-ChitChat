import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.config";

// Styles
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { setCurrentChannel } from "../../redux/channel/channel.action";

const Channels = ({ currentUser, setCurrentChannel }) => {
	const [channelsBar, setChannelsBar] = useState({
		channels: [],
		channelName: "",
		channelDetails: "",
	});
	const [modal, setModal] = useState(false);
	const channelsRef = firebase.database().ref("channels");

	const { channels, channelName, channelDetails } = channelsBar;

	useEffect(() => {
		addListeners();
	}, []);

	const closeModal = () => {
		setModal(false);
	};

	const openModal = () => {
		setModal(true);
	};

	const addListeners = () => {
		let loadedChannels = [];
		channelsRef.on("child_added", (snap) => {
			loadedChannels.push(snap.val());
			console.log(loadedChannels);
			setChannelsBar({
				...channelsBar,
				channels: [...channels, ...loadedChannels],
			});
		});
	};

	const addChannel = () => {
		const key = channelsRef.push().key;

		const newChannel = {
			id: key,
			name: channelName,
			details: channelDetails,
			createdBy: {
				name: currentUser.displayName,
				avatar: currentUser.photoURL,
			},
		};

		channelsRef
			.child(key)
			.update(newChannel)
			.then(() => {
				setChannelsBar({ ...channelsBar, channelName: "", channelDetails: "" });
				closeModal();
				console.log("channel added");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid(channelsBar)) {
			addChannel();
		}
	};

	const isFormValid = ({ channelName, channelDetails }) => {
		return channelName && channelDetails;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setChannelsBar({ ...channelsBar, [name]: value });
	};

	return (
		<React.Fragment>
			<Menu.Menu style={{ paddingBottom: "2rm" }}>
				<Menu.Item>
					<span>
						<Icon name="exchange" /> CHANNELS
					</span>{" "}
					({channels.length}) <Icon name="add" onClick={openModal} />
				</Menu.Item>
				{channels.length > 0 &&
					channels.map((channel) => (
						<Menu.Item
							key={channel.id}
							onClick={() => setCurrentChannel(channel)}
							style={{ opacity: 0.7 }}
						>
							# {channel.name}
						</Menu.Item>
					))}
			</Menu.Menu>
			<Modal basic open={modal} onClose={closeModal}>
				<Modal.Header>Add a Channel</Modal.Header>
				<Modal.Content>
					<Form onSubmit={handleSubmit}>
						<Form.Field>
							<Input
								fluid
								label="Name of Channel"
								name="channelDetails"
								onChange={handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								fluid
								label="About the Channel"
								name="channelName"
								onChange={handleChange}
							/>
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" inverted onClick={handleSubmit}>
						<Icon name="checkmark" /> Add
					</Button>
					<Button color="red" inverted onClick={closeModal}>
						<Icon name="remove" /> Cancel
					</Button>
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setCurrentChannel })(Channels);
