import React, { useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase/firebase.config";
import { connect } from "react-redux";

import { useStateWithCallbackLazy } from 'use-state-with-callback'

import MessagesHeader from "../messages-header/messages-header.component";
import MessageForm from "../messages-form/messages-form.component";
import Message from "../message/message.component";

import "./messages.styles.scss";

const Messages = ({ currentChannel, currentUser, isPrivateChannel }) => {

	const [state, setState] = useStateWithCallbackLazy({
		privateMessagesRef: firebase.database().ref('privateMessages'),
		messages: [],
		messagesLoading: true,
		channel: currentChannel,
		user: currentUser,
		messagesRef: firebase.database().ref("messages"),
		progressBar: false,
		numUniqueUsers: '',
		searchTerm: "",
		searchLoading: false,
		searchResult: [],
		privateChannel: isPrivateChannel
	})

	const { privateChannel, messages, messagesRef, channel, user, progressBar, numUniqueUsers, searchTerm, searchLoading, searchResult } = state

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
		const ref = getMessagesRef()
		ref.child(channelId).on("child_added", (snap) => {
			loadedMessages.push(snap.val());
			// console.log("loaded messages", loadedMessages);
			setState({ ...state, messages: [...messages, ...loadedMessages], messagesLoading: false })
		});
		countUniqueUsers(loadedMessages)
	};

	const getMessagesRef = () => {
		const { messagesRef, privateMessagesRef, privateChannel } = state
		return privateChannel ? privateMessagesRef : messagesRef
	} 

	const isProgressBarVisible = percent => {
		if (percent > 0) {
			setState({ ...state, progressBar: true })
		}
	}

	const handleSearchChange = e => {
		setState({ ...state, searchTerm: e.target.value, searchLoading: true }, () => {
			handleSearchMessages()
		})
	}

	const handleSearchMessages = () => {
		const channelMessages = [...messages]
		const regex = new RegExp(searchTerm, 'gi')
		const searchResult = channelMessages.reduce((acc, message) => {
			if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
				acc.push(message)
			}
			return acc
		}, [])
		setState({ ...state, searchResult })
		setTimeout(() => {
			setState({ ...state, searchLoading: false })
		}, 1000)
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

	const displayChannelName = channel => {
		return channel ? `${privateChannel ? '@' : '#'}${channel.name}` : ""
	}

	const displayMessages = messages => {
		return (
			messages.length > 0 &&
			messages.map((message, index) => (
				<Message
					key={index}
					message={message}
					user={currentUser}
				/>
			))
		)
	}

	return (
		<React.Fragment>
			<MessagesHeader searchLoading={searchLoading} handleSearchChange={handleSearchChange} channelName={displayChannelName(channel)} numUniqueUsers={numUniqueUsers} isPrivateChannel={privateChannel} />

			<Segment>
				<Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
					{/* {console.log(messages)} */}
					{searchTerm ? displayMessages(searchResult) : displayMessages(messages)}
				</Comment.Group>
			</Segment>

			<MessageForm getMessagesRef={getMessagesRef} isPrivateChannel={privateChannel} messagesRef={messagesRef} isProgressBarVisible={isProgressBarVisible} />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
	isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(Messages);
