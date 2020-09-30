import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = ({ modal, closeModal, uploadFile }) => {
	const [state, setState] = useState({
		file: null,
		authorized: ["image/jpeg", "image/png"]
	})
	const { file, authorized } = state

	const addFile = (e) => {
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			setState({ ...state, file: file })
		}
	};

	const sendFile = () => {
		if (file) {
			if (isAuthorized(file.name)) {
				const metaData = { contentType: mime.lookup(file.name) };
				uploadFile(file, metaData);
				closeModal();
				clearFile()
			}
		}
	};

	const isAuthorized = (fileType) => {
		return authorized.includes(mime.lookup(fileType));
	};

	const clearFile = () => {
		setState({ ...state, file: null })
	};

	return (
		<Modal basic open={modal} onClose={closeModal}>
			<Modal.Header>Select an Image File</Modal.Header>
			<Modal.Content>
				<Input
					onChange={addFile}
					fluid
					label="file types: jpg, png"
					name="file"
					type="file"
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={sendFile} color="green" inverted>
					<Icon name="checkmark" /> Send
				</Button>
				<Button color="red" inverted onClick={closeModal}>
					<Icon name="remove" /> Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default FileModal;
