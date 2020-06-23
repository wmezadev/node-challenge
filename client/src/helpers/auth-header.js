export const authHeader = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('chatroom-jobsity-user'));

    if (user && user.token) {
        return { 'Authorization': user.token };
    } else {
        return {};
    }
}