// import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}