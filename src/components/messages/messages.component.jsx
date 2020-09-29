import React, { useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase/firebase.config";
import { connect } from "react-redux";

import MessagesHeader from "../messages-header/messages-header.component";
import MessageForm from "../messages-form/messages-form.component";
import Message from "../message/message.component";

import "./messages.styles.scss";

const Messages = ({ currentChannel, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [messagesRef, setMessagesRef] = useState(firebase.database().ref("messages"))
	const [messagesLoading, setMessagesLoading] = useState(false);

	useEffect(() => {
		if (currentChannel && currentUser) {
			addListener(currentChannel.id);
		}
	}, [currentChannel, currentUser, messagesRef]);

	const addListener = (channelId) => {
		addMessageListener(channelId);
	};

	const addMessageListener = (channelId) => {
		let loadedMessages = [];
		messagesRef.child(channelId).on("child_added", (snap) => {
			loadedMessages.push(snap.val());
			// console.log("loaded messages", loadedMessages);
			setMessages([ ...messages, ...loadedMessages ]);
			setMessages(loadedMessages);
			setMessagesLoading(false);
		});
	};

	return (
		<React.Fragment>
			<MessagesHeader />

			<Segment>
				<Comment.Group className="messages">
                    {/* {console.log(messages)} */}
					{messages.length > 0 &&
						messages.map((message, index) => (
							<Message
								key={index}
								message={message}
								user={currentUser}
							/>
						))}
				</Comment.Group>
			</Segment>

			<MessageForm messagesRef={messagesRef} />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
});

export default connect(mapStateToProps)(Messages);
