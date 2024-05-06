
export const saveUserToSessionStorage = (userObject) => {
    const user = JSON.stringify(userObject);
    sessionStorage.setItem('user', user);
};

export const loadUserFromSessionStorage = () => {
    const userObject = sessionStorage.getItem('user');
    return userObject ? JSON.parse(userObject) : null;
};

export const removeUserFromSession = () => {
    sessionStorage.removeItem('user');
};