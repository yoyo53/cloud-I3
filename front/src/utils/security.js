async function redirectUnautorized(router) {
    let token = window.localStorage.getItem("token");
    if (token == null) {
        router.push("/login");
    }
    else {
        let response = await fetch(`${process.env.ROOTAPI}/auth/verifyToken`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            window.localStorage.removeItem("token");
            router.push("/login");
        }
    }
}

async function redirectLogedIn(router) {
    let token = window.localStorage.getItem("token");
    if (token != null) {
        let response = await fetch(`${process.env.ROOTAPI}/auth/verifyToken`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            router.push("/");
        }
        else {
            window.localStorage.removeItem("token");
        }
    }
}

module.exports = {
    redirectUnautorized,
    redirectLogedIn
}