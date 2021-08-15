import React, { Component } from 'react';

import { withAuthorization } from '../Session';

class AdminPage extends Component {

    render() {
        return(<div>admin page!!!</div>)
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage);