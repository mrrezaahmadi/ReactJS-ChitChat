import React, { useState } from "react";
import firebase from "../../firebase/firebase.config";
import md5 from "md5";
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Register = () => {
	const [formInput, setFormInput] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});

	const [userRef, setUserRef] = useState(firebase.database().ref("users"));
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);
	const { username, email, password, passwordConfirmation } = formInput;

	const handleChange = (e) => {
		setFormInput({ ...formInput, [e.target.name]: e.target.value });
	};

	const isFormValid = () => {
		if (isFormEmpty(formInput)) {
			setErrors("Fill in all the fields");
			return false;
		} else if (!isPasswordValid(formInput)) {
			setErrors("Password is not valid! ");
			return false;
		} else {
			// form valid
			return true;
		}
	};

	const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
		return (
			!username.length ||
			!email.length ||
			!password.length ||
			!passwordConfirmation.length
		);
	};

	const isPasswordValid = ({ password, passwordConfirmation }) => {
		if (password.length < 6 || passwordConfirmation.length < 6) {
			return false;
		} else if (password !== passwordConfirmation) {
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			setErrors("");
			setLoading(true);

			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((createdUser) => {
					console.log(createdUser);
					createdUser.user
						.updateProfile({
							displayName: username,
							photoURL: `http://gravatar.com/avatar/${md5(
								createdUser.user.email
							)}?d=identicon`,
						})
						.then(() => {
							saveUser(createdUser).then(() => {
								console.log("user saved");
							});
							setLoading(false);
						})
						.catch((error) => {
							console.error(error);
							setErrors(error);
							setLoading(false);
						});
				})
				.catch((error) => {
					console.error(error);
					setLoading(false);
					setErrors(error);
				});
		}
	};

	const saveUser = (createdUser) => {
		return userRef.child(createdUser.user.uid).set({
			name: createdUser.user.displayName,
			avatar: createdUser.user.photoURL,
		});
	};

	return (
		<Grid textAlign="center" verticalAlign="middle" className="app">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" icon color="orange" textAlign="center">
					<Icon name="puzzle piece" color="red" />
					Register for slack
				</Header>
				<Form size="large" onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Input
							fluid
							value={username}
							name="username"
							icon="user"
							iconPosition="left"
							placeholder="Username"
							onChange={handleChange}
							type="text"
						/>
						<Form.Input
							fluid
							value={email}
							name="email"
							icon="mail"
							iconPosition="left"
							placeholder="Email Address"
							onChange={handleChange}
							type="email"
						/>
						<Form.Input
							fluid
							value={password}
							name="password"
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							onChange={handleChange}
							type="password"
						/>
						<Form.Input
							fluid
							value={passwordConfirmation}
							name="passwordConfirmation"
							icon="repeat"
							iconPosition="left"
							placeholder="Password Confirmation"
							onChange={handleChange}
							type="password"
						/>
						<Button
							disabled={loading}
							className={loading ? "loading" : ""}
							color="red"
							fluid
							size="large"
						>
							Submit
						</Button>
					</Segment>
				</Form>
				{errors.length > 0 && (
					<Message error>
						<h3>Error</h3>
						<p>{errors}</p>
					</Message>
				)}
				<Message>
					Already a user? <Link to="/login">Login</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Register;
