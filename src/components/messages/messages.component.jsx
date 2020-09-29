import React, { useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase/firebase.config";
import { connect } from "react-redux";

import { useStateWithCallbackLazy } from 'use-state-with-callback'

import MessagesHeader from "../messages-header/messages-header.component";
import MessageForm from "../messages-form/messages-form.component";
import Message from "../message/message.component";

import "./messages.styles.scss";

const Messages = ({ currentChannel, currentUser }) => {

	const [state, setState] = useStateWithCallbackLazy({
		messages: [],
		messagesLoading: true,
		channel: currentChannel,
		user: currentUser,
		messagesRef: firebase.database().ref("messages"),
		progressBar: false,
		numUniqueUsers: ''
	})

	const { messages, messagesLoading, messagesRef, channel, user, progressBar, numUniqueUsers } = state

	useEffect(() => {
		if (channel && user) {
			addListener(channel.id);
		}
	}, []);

	const addListener = (channelId) => {
		addMessageListener(channelId);
	};

	const addMessageListener = (channelId) => {
		let loadedMessages = [];
		messagesRef.child(channelId).on("child_added", (snap) => {
			loadedMessages.push(snap.val());
			// console.log("loaded messages", loadedMessages);
			setState({ ...state, messages: [...messages, ...loadedMessages], messagesLoading: false })
		});
		countUniqueUsers(loadedMessages)
	};

	const isProgressBarVisible = percent => {
		if (percent > 0) {
			setState({ ...state, progressBar: true })
		}
	}

	const countUniqueUsers = messages => {
		const uniqueUsers = messages.reduce((acc, message) => {
			if (!acc.includes(message.user.name)) {
				acc.push(message.user.name)
			}
			return acc
		}, [])

		const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;

		const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`
		setState({ ...state, numUniqueUsers })
	}

	const displayChannelName = channel => channel ? `${channel.name}` : ''

	return (
		<React.Fragment>
			<MessagesHeader channelName={displayChannelName(channel)} numUniqueUsers={numUniqueUsers} />

			<Segment>
				<Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
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

			<MessageForm messagesRef={messagesRef} isProgressBarVisible={isProgressBarVisible} />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
});

export default connect(mapStateToProps)(Messages);
