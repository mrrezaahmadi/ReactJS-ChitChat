import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

// Styles
import 'semantic-ui-css/semantic.min.css'

// Firebase
import firebase from './firebase/firebase.config'

// Components
import Home from './pages/home-page/home-page.component'
import Login from './pages/login-page/login-page.component'
import Register from './pages/register-page/register-page.component'
import Spinner from './components/spinner/spinner.component'

// Actions
import { setUser, clearUser } from './redux/user/user.action'

function App({ setUser, isLoading, clearUser }) {
  const history = useHistory()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user)
        setUser(user)
        history.push('/')
      } else {
        history.push('/login')
        clearUser()
      }
    })
  }, [])

  return isLoading ? <Spinner /> : (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path="/login" component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  )

}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})

export default connect(mapStateToProps, { setUser, clearUser })(App);
