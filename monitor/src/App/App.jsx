import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import { history, Role } from '@/_helpers';
import AuthService from '../_services/authentication.service';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import { RegisterPage } from '@/RegisterPage';
import { HostPage, HostAddPage, HostEditPage } from '@/HostPage';
import { ControllerPage } from '@/ControllerPage';
import { AlertPage, AddAlertPage } from '@/AlertPage';
import { ApplicationPage } from '@/ApplicationPage';
import { GraphPage } from '@/GraphPage';
import { AddApplicationPage } from '@/AddApplicationPage';
import { ControllerHostPage } from '@/ControllerHostPage';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
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
                </div>
                <Routes>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='' element={<HomePage />} />
                        <Route path='admin' element={<PrivateRoute roles={[Role.Admin]} />}>
                            <Route path='' element={<AdminPage />} />
                            <Route path='hosts' element={<HostPage />} />
                            <Route path='hosts/add' element={<HostAddPage />} />
                            <Route path='hosts/edit/:id' element={<HostEditPage />} />
                            <Route path='hostaddapps/:id' element={<AddApplicationPage />} />
                            <Route path='controllers' element={<ControllerPage />} />
                            <Route path='alerts' element={<AlertPage />} />
                            <Route path='alerts/add' element={<AddAlertPage />} />
                            <Route path='applications' element={<ApplicationPage />} />
                            <Route path='controllers/:id' element={<ControllerHostPage/>}/>
                        </Route>
                        <Route path='graphs' element={<GraphPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>
            </Router>
        );
    }
}

export { App }; 