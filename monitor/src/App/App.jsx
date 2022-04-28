import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import  AuthService from '../_services/authentication.service';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import  { RegisterPage } from '@/RegisterPage';
import {CpuPage} from '@/GraphPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        const user  = AuthService.getCurrentUser();
        
        if(user){
            this.setState({
                currentUser: user,
                isAdmin: user && user.role == 2
            });
        }
    }

    logout() {
        AuthService.logout();
        history.push('/login');
        window.location.reload();
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <Routes>
                                        <Route exact path='/' element={<PrivateRoute/>}>
                                            <Route exact path='/' element={<HomePage/>}/>
                                        </Route>
                                        <Route path='/admin' element={<PrivateRoute roles={[Role.Admin]}/>}>
                                            <Route path='' element={<AdminPage/>}/>
                                        </Route>
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route path="/register" element={<RegisterPage />} />
                                        <Route path="/cpu" element={<CpuPage/>}/>
                                        <Route path="/host" element={<HostPage/>}>
                                            <Route path="/host/add" element={<HostAddPage/>}/>
                                            <Route path="/host/delete" element={<HostDeletePage/>}/>
                                        </Route>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
            
        );
    }
}

export { App }; 