import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

import firebase from '../../firebase/firebase.config'

const DirectMessages = ({ currentUser }) => {

    const [state, setState] = useState({
        users: [],
        user: currentUser,
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence')
    })
    const { users, user, usersRef, connectedRef, presenceRef } = state

    useEffect(() => {
        if (user) {
            addListeners(user.uid)
        }
    }, [])

    const addListeners = currentUserUid => {
        let loadedUsers = []
        usersRef.on('child_added', snap => {
            if (currentUserUid !== snap.key) {
                let user = snap.val()
                user['uid'] = snap.key()
                user['status'] = 'offline'
                loadedUsers.push(user)
                setState({ ...state, users: [...users, ...loadedUsers] })
            }
        })

        connectedRef.on('value', snap => {
            if (snap.val() === true) {
                const ref = presenceRef.child(currentUserUid)
                ref.set(true)
                ref.onDisconnect().remove(error => {
                    if (error !== null) {
                        console.log(error)
                    }
                })
            }
        })

        presenceRef.on('child_added', snap => {
            if (currentUserUid !== snap.key) {
                addStatusToUser(snap.key)
            }
        })
        presenceRef.on('child_removed', snap => {
            if (currentUserUid !== snap.key) {
                addStatusToUser(snap.key, false)
            }
        })
    }

    const addStatusToUser = (userId, connected = true) => {
        const updatedUsers = users.reduce((acc, item) => {
            if (item.uid === userId) {
                item['status'] = `${connected ? "online" : 'ofline'}`
            }
            return acc.concat(user)
        }, [])

        setState({ ...state, users: [...users, ...updatedUsers] })
    }

    const isUserOnline = user => {
        return user.status === 'online'
    }


    return (
        <Menu.Menu className="menu" >
            <Menu.Item>
                <span>
                    <Icon name="mail" /> DIRECT MESSAGES
                </span>{' '}
                ({users.length})
            </Menu.Item>
            {users.map(item => (
                <Menu.Item key={item.uid} onClick={() => console.log(user)} style={{ opacity: 0.7, fontStyle: 'italic' }} >
                    <Icon name="circle" color={isUserOnline(item) ? 'green' : 'red'} />
                    @ {item.name}
                </Menu.Item>
            ))}
        </Menu.Menu>
    )
}

export default DirectMessages
