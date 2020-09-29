import React, { useState, useEffect } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import { useStateWithCallbackLazy } from "use-state-with-callback";

import uuidv4 from "uuid/dist/v4";

import firebase from "../../firebase/firebase.config";

import "./messages-form.styles.scss";

import FileModal from "../file-modal/file-modal.component";
import ProgressBar from '../progress-bar/progress-bar.component'

const MessagesFrom = ({ currentUser, currentChannel, messagesRef, isProgressBarVisible }) => {
	const storageRef = firebase.storage().ref();

	const [state, setState] = useStateWithCallbackLazy({
		uploadTask: null,
		uploadState: "",
		percentUploaded: 0,
		message: "",
		channel: currentChannel,
		user: currentUser,
		loading: false,
		errors: [],
		modal: false,
	});

	const {
		uploadTask,
		uploadState,
		percentUploaded,
		message,
		channel,
		user,
		loading,
		modal,
		errors,
	} = state;

	const handleChange = (e) => {
		const { value } = e.target;
		setState({ ...state, message: value });
	};

	const openModal = () => {
		setState({ ...state, modal: true });
	};
	const closeModal = () => {
		setState({ ...state, modal: false });
	};

	const createMessage = (fileURL = null) => {
		const newMessage = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				id: currentUser.uid,
				name: currentUser.displayName,
				avatar: currentUser.photoURL,
			},
		};

		if (fileURL !== null) {
			newMessage["image"] = fileURL;
		} else {
			newMessage["content"] = message;
		}

		return newMessage;
	};

	const sendMessage = () => {
		if (message) {
			setState({ ...state, loading: true });
			messagesRef
				.child(currentChannel.id)
				.push()
				.set(createMessage())
				.then(() => {
					setState({ ...state, loading: false, message: "", errors: [] });
				})
				.catch((error) => {
					console.error(error);
					setState({ ...state, loading: false, errors: [...errors, error] });
				});
		} else {
			setState({ ...state, errors: [...errors, { message: "Add a message" }] });
		}
	};

	const uploadFile = (file, metaData) => {
		// console.log(file, metaData)
		const pathToUpload = currentChannel.id;
		const ref = messagesRef;
		const filePath = `chat/public/${uuidv4}.jpg`;

		setState(
			{
				...state,
				uploadState: "uploading",
				uploadTask: storageRef.child(filePath).put(file, metaData),
			},
			() => {
				uploadTask.on(
					"state_changed",
					(snap) => {
						const percentUploaded = Math.round(
							(snap.bytesTransferred / snap.totalBytes) * 100
						);
						isProgressBarVisible(percentUploaded)
						setState({ ...state, percentUploaded });
					},
					(error) => {
						console.error(error);
						setState({
							...state,
							errors: [...errors, error],
							uploadState: "error",
							uploadTask: null,
						});
					},
					() => {
						uploadTask.snapshot.ref
							.getDownloadURL()
							.then((downloadUrl) => {
								sendFileMessage(downloadUrl, ref, pathToUpload);
							})
							.catch((error) => {
								console.error(error);
								setState({
									...state,
									errors: [...errors, error],
									uploadState: "error",
									uploadTask: null,
								});
							});
					}
				);
			}
		);
	};

	const sendFileMessage = (fileUrl, ref, pathToUpload) => {
		ref
			.child(pathToUpload)
			.push()
			.set(
				createMessage(fileUrl)
					.then(() => {
						setState({ ...state, uploadState: "done" });
					})
					.catch((error) => {
						console.error(error);
						setState({ ...state, errors: [...errors, error] });
					})
			);
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
					onClick={openModal}
					color="teal"
					content="Upload Media"
					labelPosition="right"
					icon="cloud upload"
				/>
				<FileModal
					uploadFile={uploadFile}
					modal={modal}
					closeModal={closeModal}
				/>
			</Button.Group>
			<ProgressBar uploadState={uploadState} percentUploaded={percentUploaded} />
		</Segment>
	);
};

const mapStateToProps = (state) => ({
	currentChannel: state.channel.currentChannel,
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(MessagesFrom);
