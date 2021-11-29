export const getUser = () => {
    const userStr = localStorage.getItem("token");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    return localStorage.getItem("token")
}



export const getProfile = () => {
    localStorage.getItem("profile");

}

export const removeUserSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("session");

}