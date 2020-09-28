import React, { useState } from "react";
import firebase from "../../firebase/firebase.config";

// Styles
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";

const Channels = ({ currentUser }) => {
	const [channelsBar, setChannelsBar] = useState({
		channels: [],
		channelName: "",
		channelDetails: "",
	});
	const [modal, setModal] = useState(false);
	const channelsRef = firebase.database().ref("channels");

	const { channels, channelName, channelDetails } = channelsBar;

	const closeModal = () => {
		setModal(false);
	};

	const openModal = () => {
		setModal(true);
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
			</Menu.Menu>
			<Modal basic open={modal} onClose={closeModal}>
				<Modal.Header>Add a Channel</Modal.Header>
				<Modal.Content>
					<Form onSubmit={handleSubmit}>
						<Form.Field>
							<Input
								fluid
								label="About the Channel"
								name="channelName"
								onChange={handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								fluid
								label="Name of Channel"
								name="channelDetails"
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

export default connect(mapStateToProps)(Channels);
