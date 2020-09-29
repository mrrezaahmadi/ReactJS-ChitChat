import React, { useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const DirectMessages = () => {

    const [state, setState] = useState({
        users: []
    })

    const { users } = state

    return (
        <Menu.Menu className="menu" >
            <Menu.Item>
                <span>
                    <Icon name="mail" /> DIRECT MESSAGES
                </span>{' '}
                ({users.length})
            </Menu.Item>
            {/* Users to send direct message */}
        </Menu.Menu>
    )
}

export default DirectMessages
