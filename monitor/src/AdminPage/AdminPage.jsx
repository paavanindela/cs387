import React from 'react';

 import  UserService  from '../_services/user.service';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        UserService.getAll().then(res => {this.setState( {users: res.data.user.rows} ); }, error => {console.log(error)});
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Admin</h1>
                <p>This page can only be accessed by active users.</p>
                <div>
                    All users from secure (admin only) api end point:
                    {users &&
                        <ul>
                            {users.map(user =><div>
                                <li key={user.username}>{user.username}  {user.role==1?'active':'inactive'} </li>

                                {user.role != 0 && <button className='form-control' onClick={
                                   (user)=> UserService.makeActive(user.username)
                                }>Make Controller</button>}
                                <button onClick={(user)=> UserService.delete(user.username)} >Delete User</button>
                                </div>
                            )}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export { AdminPage };