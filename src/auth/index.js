export const signup = async (user) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const signin = async (user) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const signout = async (next) => {
    try {
        if (typeof window !== "undefined") localStorage.removeItem("jwt");
        next();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
            method: "POST"
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("jwt")) return JSON.parse(localStorage.getItem("jwt"));
    else return false;
}

export const forgotPassword = email => {
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};