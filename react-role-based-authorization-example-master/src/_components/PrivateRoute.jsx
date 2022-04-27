import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

import AuthService from '../_services/authentication.service';

export const PrivateRoute = ({roles, ...rest }) => {
    const currentUser = AuthService.getCurrentUser();
    return !currentUser ?
        <Navigate to={{ pathname: '/login', state: { from: rest.location } }} /> :
        (roles && currentUser.role == 0) ?
            <Navigate to={{ pathname: '/' }} />
            : <Outlet/>;
}