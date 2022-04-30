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
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav">
                        <Link to="/admin/host" className="nav-item nav-link">Hosts</Link>
                        {/* <Link to="/admin/controller" className="nav-item nav-link">Controllers</Link>
                        <Link to="/admin/alerts" className="nav-item nav-link">Alerts</Link> */}
                    {/* </div>
                </nav> */}
                {/* <ul>
                    <li key={"host"} >
                        <Link to="/admin/hosts">Hosts</Link>
                    </li>
                    <li key={"controller"}>
                        <Link to="/admin/controllers">Controllers</Link>
                    </li>
                    <li key={"alert"}>
                        <Link to="/admin/alerts">Alerts</Link>
                    </li>
                </ul> */}
                <br></br>
                <div className='navbar' >
                <a  style={{color:'white',float:'left',background:"#9a9dad",width:'18%',marginLeft:'5%',border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/admin/controllers" style={{color:'white',padding:"20px 20px"}}>Controllers</Link></a>
                    <a  style={{color:'white',background:"#9a9dad",float:'left',width:'18%',alignItems:'center',border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/admin/hosts" style={{color:'white',padding:"20px 20px 20px 20px"}}>Hosts</Link></a>
                    <a style={{color:'white',float:'left',width:'18%',background:"#9a9dad",border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/admin/alerts" style={{color:'white',padding:"20px 20px"}}>Alerts</Link></a>
                        <a style={{color:'white',float:'left',width:'18%',background:"#9a9dad",border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/admin/applications" style={{color:'white',padding:"20px 20px"}}>Applications</Link></a>
                </div>
                {/* </ul> */}
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