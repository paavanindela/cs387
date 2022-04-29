import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet} from 'react-router-dom';
import { history, Role } from '@/_helpers';
import AuthService from '../_services/authentication.service';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { LoginPage } from '@/LoginPage';
import { RegisterPage } from '@/RegisterPage';
import { HostPage, HostAddPage, HostEditPage } from '@/HostPage';
// import { ControllerPage } from '@/ControllerPage';
// import { AlertPage } from '@/AlertPage';
import { CpuPage } from '@/GraphPage';

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
                {/* <Route path="/hostedit" element={<PrivateRoute roles={[Role.Admin]} />}>
                        <Route path=':add' element={<HostAddPage />} />
                    </Route> */}
                    
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='/' element={<HomePage />} />
                    </Route>
                    <Route path='/admin' element={<PrivateRoute roles={[Role.Admin]} />}>
                        <Route path='' element={<AdminPage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cpu" element={<CpuPage />} />
                    <Route path="/adminhost" element={<PrivateRoute roles={[Role.Admin]} />}>
                        <Route path='' element={<HostPage />} />
                    </Route>
                    <Route path="/hostadd" element={<PrivateRoute roles={[Role.Admin]} />}>
                        <Route path='' element={<HostAddPage />} />
                        
                    </Route>
                    
                </Routes>
            </Router>
        );
    }
}

export { App }; 