import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = (props) => {
	const { modal, closeModal, uploadFile } = props;
	const [file, setFile] = useState(null);
	const authorizedTypes = ["image/jpeg", "image/png"];

	const addFile = (e) => {
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			setFile(file);
		}
	};

	const sendFile = () => {
		if (file) {
			if (isAuthorized(file.name)) {
				const metaData = { contentType: mime.lookup(file.name) };
				uploadFile(file, metaData);
				closeModal();
				setFile(null);
			}
		}
	};

	const isAuthorized = (fileType) => {
		return authorizedTypes.includes(mime.lookup(fileType));
	};

	const clearFile = () => {
		setFile(null);
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
