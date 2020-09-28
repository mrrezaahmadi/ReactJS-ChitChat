import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import firebase from "../../firebase/firebase.config";

import "./messages-form.styles.scss";

const MessagesFrom = ({ currentUser, currentChannel, messagesRef }) => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const createMessage = () => {
		const newMessage = {
			content: message,
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				id: currentUser.uid,
				name: currentUser.displayName,
				avatar: currentUser.photoURL,
			},
		};

		return newMessage;
	};

	const sendMessage = () => {
		if (message) {
			setLoading(true);
			messagesRef
				.child(currentChannel.id)
				.push()
				.set(createMessage())
				.then(() => {
					setLoading(false);
					setMessage("");
                    setErrors([]);
				})
				.catch((error) => {
					console.error(error);
					setLoading(false);
					setErrors([...errors, error]);
				});
		} else {
			setErrors([...errors, { message: "Add a message" }]);
		}
	};
	return (
		<Segment className="message-form">
			<Input
				onChange={handleChange}
                fluid
                value={message}
				name="message"
				style={{ marginBottom: "0.7em" }}
				label={<Button icon="add" />}
				labelPosition="left"
				placeholder="Write your message"
				className={
					errors.some((error) => error.message.includes("message"))
						? "error"
						: ""
				}
			/>
			<Button.Group icon widths="2">
				<Button
					disabled={loading}
					onClick={sendMessage}
					color="orange"
					content="Add Reply"
					labelPosition="left"
					icon="edit"
				/>
				<Button
					color="teal"
					content="Upload Media"
					labelPosition="right"
					icon="cloud upload"
				/>
			</Button.Group>
		</Segment>
	);
};

const mapStateToProps = (state) => ({
	currentChannel: state.channel.currentChannel,
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(MessagesFrom);
