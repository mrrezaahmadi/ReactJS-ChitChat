import React, { useState } from 'react'
import firebase from '../../firebase/firebase.config'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [formInput, setFormInput] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const { username, email, password, passwordConfirmation } = formInput

    const handleChange = (e) => {
        setFormInput({...formInput, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createdUser => {
                console.log(createdUser)
            }).catch(error => {
                console.error(error)
            })
    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="red" />
                        Register for slack
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid value={username} name="username" icon="user" iconPosition="left" placeholder="Username" onChange={handleChange} type="text" />
                        <Form.Input fluid value={email} name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={handleChange} type="email" />
                        <Form.Input fluid value={password} name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={handleChange} type="password" />
                        <Form.Input fluid value={passwordConfirmation} name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={handleChange} type="password" />
                        <Button color="red" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                <Message>Already a user? <Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}

export default Register
