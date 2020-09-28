import React from "react";
import firebase from "../../firebase/firebase.config";
import { connect } from "react-redux";

// Styles
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

const handleSignout = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log("signed out");
		});
};

const UserPanel = ({ currentUser }) => {
	const dropdownOptions = () => [
		{
			key: "user",
			text: (
				<span>
					Signed in as{" "}
					<strong>{currentUser ? currentUser.displayName : "Guest"}</strong>
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
					<Header style={{ padding: "0.25em" }} as="h4" inverted>
						<Dropdown
							trigger={
								currentUser ? (
									<span>
										<Image src={currentUser.photoURL} spaced="right" avatar />
										{currentUser.displayName}
									</span>
								) : (
									<span>Guest</span>
								)
							}
							options={dropdownOptions()}
						/>
					</Header>
				</Grid.Row>
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(UserPanel);
