import React, { useState } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

const Channels = () => {
	const [channelsBar, setChannelsBar] = useState({
		channels: [],
		channelName: "",
		channelDetails: "",
	});
	const [modal, setModal] = useState(false);

	const { channels, channelName } = channelsBar;

	const closeModal = () => {
		setModal(false);
	};

	const openModal = () => {
		setModal(true);
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
					<Form>
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
					<Button color="green" inverted>
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

export default Channels;
