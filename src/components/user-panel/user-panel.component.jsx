import React from "react";
import firebase from "../../firebase/firebase.config";

// Styles
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

const handleSignout = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log("signed out");
		});
};

const UserPanel = () => {
	const dropdownOptions = () => [
		{
			key: "user",
			text: (
				<span>
					Signed in as <strong>User</strong>
				</span>
			),
			disabled: true,
		},
		{
			key: "avatar",
			text: <span>Change avatar</span>,
		},
		{
			key: "signout",
			text: <span onClick={handleSignout}>Sign Out</span>,
		},
	];
	return (
		<Grid style={{ background: "4c3c4c" }}>
			<Grid.Column>
				<Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
					<Header inverted floated="left" as="h2">
						<Icon name="code" />
						<Header.Content>DevChat</Header.Content>
					</Header>
				</Grid.Row>
				<Header style={{ padding: "0.25em" }} as="h4" inverted>
					<Dropdown trigger={<span>User</span>} options={dropdownOptions()} />
				</Header>
			</Grid.Column>
		</Grid>
	);
};

export default UserPanel;
