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
            <div style={{alignItems:'center'}}>
                <h1 style={{alignItems:'center',textAlign:'center',background:'orange',margin:'0',padding:'15px'}} >HOME</h1>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh',background:'#ddd'}}>
                    <p>Your role is:  </p>&nbsp;&nbsp;&nbsp;&nbsp;<h1 style={{color:'Blue'}}>{currentUser.role==2?"ADMIN":currentUser.role==1?"CONTROLLER":"INACTIVE"}</h1>
                </div>
            </div>
        );
    }
}

export { HomePage };