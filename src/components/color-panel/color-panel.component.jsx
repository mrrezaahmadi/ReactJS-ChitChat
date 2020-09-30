import React, { Component } from "react";
import {
	Sidebar,
	Menu,
	Divider,
	Button,
	Modal,
	Icon,
	Label,
	Segment,
} from "semantic-ui-react";

import firebase from "../../firebase/firebase.config";

import { SliderPicker } from "react-color";

export class ColorPanel extends Component {
	state = {
		modal: false,
		primary: "",
		secondary: "",
		usersRef: firebase.database().ref("users"),
		user: this.props.currentUser,
	};

	handleChangePrimary = (color) => {
		this.setState({ primary: color.hex });
	};
	handleChangeSecondary = (color) => {
		this.setState({ secondary: color.hex });
	};

	openModal = () => {
		this.setState({ modal: true });
	};

	closeModal = () => {
		this.setState({ modal: false });
	};

	handleSaveColor = () => {
		if (this.state.primary && this.state.secondary) {
			this.saveColors(this.state.primary, this.state.secondary);
		}
	};

	saveColors = (primary, secondary) => {
		this.state.usersRef
			.child(`${this.state.user.uid}/colors`)
			.push()
			.update({
				primary,
				secondary,
			})
			.then(() => {
				console.log("colors added");
				this.closeModal();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	render() {
		const { modal, primary, secondary } = this.state;
		return (
			<Sidebar
				as={Menu}
				icon="labeled"
				vertical
				inverted
				visible
				width="very thin"
			>
				<Divider />
				<Button icon="add" size="small" color="blue" onClick={this.openModal} />

				{/* Color Picker Modal */}
				<Modal basic open={modal} onClose={this.closeModal}>
					<Modal.Header>Choose App Colors</Modal.Header>
					<Modal.Content>
						<Segment inverted>
							<Label content="Primary Color" style={{ marginBottom: "2rem" }} />
							<SliderPicker
								color={primary}
								onChange={this.handleChangePrimary}
							/>
						</Segment>
						<Segment inverted>
							<Label
								content="Secondary Color"
								style={{ marginBottom: "2rem" }}
							/>
							<SliderPicker
								color={secondary}
								onChange={this.handleChangeSecondary}
							/>
						</Segment>
					</Modal.Content>
					<Modal.Actions>
						<Button color="green" inverted onClick={this.handleSaveColor}>
							<Icon name="checkmark" /> Save Colors
						</Button>
						<Button color="red" inverted onClick={this.closeModal}>
							<Icon name="remove" /> Cancel
						</Button>
					</Modal.Actions>
				</Modal>
			</Sidebar>
		);
	}
}

export default ColorPanel;
