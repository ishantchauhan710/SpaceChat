export const checkIfUserIsLoggedIn = (navigate) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")): null;
    if(userInfoFromStorage) {
        navigate('/home');
    }
}

export const checkIfUserIsLoggedOut = (navigate) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")): null;
    if(!userInfoFromStorage) {
        navigate('/');
    }
}

