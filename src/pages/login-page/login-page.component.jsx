import React, { useState } from "react";
import firebase from "../../firebase/firebase.config";
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
import '../../App.css'

const Login = () => {
	// states
	const [formInput, setFormInput] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);

	const { email, password } = formInput;

	const handleChange = (e) => {
		setFormInput({ ...formInput, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid(formInput)) {
			setErrors("");
			setLoading(true);
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((singedInUser) => {
					// console.log(singedInUser);
				})
				.catch((error) => {
					console.error(error);
					setErrors(error);
					setLoading(false);
				});
		}
	};

	const isFormValid = ({ email, password }) => email && password;

	return (
		<Grid textAlign="center" verticalAlign="middle" className="app">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" icon color="violet" textAlign="center">
					<Icon name="code branch" color="violet" />
					Login to Chit Chat
				</Header>
				<Form size="large" onSubmit={handleSubmit}>
					<Segment stacked>
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

						<Button
							disabled={loading}
							className={loading ? "loading" : ""}
							color="violet"
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
					Don't have an account? <Link to="/register">Register</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Login;
