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
                <p>You're logged in with React & JWT!!</p>
                <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    Current user from secure api end point:
                    {/* {userFromApi &&
                        <ul>
                            <li>{currentUser.firstName} {currentUser.lastName}</li>
                        </ul>
                    } */}
                </div>
            </div>
        );
    }
}

export { HomePage };