import React from 'react';

// import { userService, authenticationService } from '@/_services';
import  AuthService  from '../_services/authentication.service'
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        // userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1>Home</h1>
                <p>Your role is: <strong>{currentUser.role==2?"ADMIN":currentUser.role==1?"CONTROLLER":"INACTIVE"}</strong>.</p>
            </div>
        );
    }
}

export { HomePage };