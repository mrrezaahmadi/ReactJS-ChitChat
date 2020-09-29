import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase.config";

import { useStateWithCallbackLazy } from 'use-state-with-callback'

// Styles
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import './channels.styles.scss'

import { setCurrentChannel } from "../../redux/channel/channel.action";

const Channels = ({ currentUser, setCurrentChannel }) => {

	const [state, setState] = useStateWithCallbackLazy({
		user: currentUser,
		channels: [],
		channelName: "",
		channelDetails: "",
		channelsRef: firebase.database().ref("channels"),
		modal: false,
		firstLoad: true,
		activeChannel: ""
	})

	const { user, channels, channelName, channelDetails, channelsRef, modal, firstLoad, activeChannel } = state

	useEffect(() => {
		addListeners();
		return () => {
			removeListeners()
		}
	}, []);



	const removeListeners = () => {
		channelsRef.off()
	}

	const closeModal = () => {
		setState({ ...state, modal: false })
	};

	const openModal = () => {
		setState({ ...state, modal: true })
	};

	const addListeners = () => {
		let loadedChannels = [];
		channelsRef.on("child_added", (snap) => {
			loadedChannels.push(snap.val());
			// console.log(loadedChannels);
			setState({ ...state, channels: [...channels, ...loadedChannels] }, () => setFirstChannel())
		});
	};


	const setFirstChannel = () => {
		if (firstLoad && channels.length > 0) {
			setCurrentChannel(channels[0])
			setActiveChannel(channels[0])
		}
	}

	const addChannel = () => {
		const key = channelsRef.push().key;

		const newChannel = {
			id: key,
			name: channelName,
			details: channelDetails,
			createdBy: {
				name: user.displayName,
				avatar: user.photoURL,
			},
		};

		channelsRef
			.child(key)
			.update(newChannel)
			.then(() => {
				setState({...state, channelDetails: "", channelName: ""})
				closeModal();
				console.log("channel added");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid(state)) {
			addChannel();
		}
	};

	const isFormValid = ({ channelName, channelDetails }) => {
		return channelName && channelDetails;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({...state, [name]: value})
	};

	const changeChannel = (chnl) => {
		setActiveChannel(chnl);
		setCurrentChannel(chnl);
	};

	const setActiveChannel = (channel) => {
		setState({...state, activeChannel: channel.id})
	};

	return (
		<React.Fragment>
			<Menu.Menu className="menu">
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
							onClick={() => changeChannel(channel)}
							style={{ opacity: 0.7 }}
							active={channel.id === activeChannel}
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
