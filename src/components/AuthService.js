export const LOGOUT_ACTION = '[Logout action] logout action';

export function saveToLocal(token) {
    localStorage.setItem('GO_DRIVE_TOKEN', JSON.stringify(token));
}

export function logout() {
    localStorage.removeItem('GO_DRIVE_TOKEN');
    console.log("logout");
    return {
        type: LOGOUT_ACTION,
    }
}

export function runLogoutTimer(timer) {
    setTimeout(() => {
        console.log(timer);
        logout();
    }, timer);
}