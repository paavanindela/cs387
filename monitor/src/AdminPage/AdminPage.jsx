import React from 'react';
import UserService from '../_services/user.service';
import AuthService from '../_services/authentication.service';
import { Route, Navigate, Outlet,Link } from 'react-router-dom';
import { history } from '../_helpers';
class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        if(AuthService.getCurrentUser().role != 2){ // ADMIN ROLE
            history.push('/');
            window.location.reload();
        }
        this.state = {
            users: null
        };
    }

    componentDidMount() {
        UserService.getAll().then(res => { this.setState({ users: res.data.user.rows }); }, error => { console.log(error) });
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav">
                        <Link to="/admin/host" className="nav-item nav-link">Hosts</Link>
                        {/* <Link to="/admin/controller" className="nav-item nav-link">Controllers</Link>
                        <Link to="/admin/alerts" className="nav-item nav-link">Alerts</Link> */}
                    {/* </div>
                </nav> */}
                <ul>
                    <li key={"host"}>
                        <Link to="/admin/hosts">Hosts</Link>
                    </li>
                    <li key={"controller"}>
                        <Link to="/admin/controllers">Controllers</Link>
                    </li>
                    <li key={"alert"}>
                        <Link to="/admin/alerts">Alerts</Link>
                    </li>
                </ul>
                {/* <div>
                    {users &&
                        <ul>
                            {users.map(user => <div>
                                <li key={user.username}>{user.username}  {user.role == 1 ? 'active' : 'inactive'} </li>

                                {user.role != 0 && <button className='form-control' onClick={
                                    (user) => UserService.makeActive(user.username)
                                }>Make Active</button>}
                                <button onClick={(user) => UserService.delete(user.username)} >Delete User</button>
                            </div>
                            )}
                        </ul>
                    }
                </div> */}
                <Outlet/>
            </div>
        );
    }
}

export { AdminPage };