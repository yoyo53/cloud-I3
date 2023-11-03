async function redirectUnautorized(router, toast) {
    let token = window.localStorage.getItem("token");
    if (token == null) {
        router.push("/login");
    }
    else {
        try {
            let response = await fetch(`${process.env.ROOTAPI}/auth/verifyToken`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                toast.error("Error: you need to be connected to see this page");
                window.localStorage.removeItem("token");
                router.push("/login");
            }    
        }
        catch {
            toast.error("Error: Internal server error, try again later");
            router.push("/");        
        }
    }
}

async function redirectLogedIn(router, toast) {
    let token = window.localStorage.getItem("token");
    if (token != null) {
        try {
            let response = await fetch(`${process.env.ROOTAPI}/auth/verifyToken`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                toast.success("Already connected");
                router.push("/");
            }
            else {
                window.localStorage.removeItem("token");
            }    
        }
        catch {}
    }
}

module.exports = {
    redirectUnautorized,
    redirectLogedIn
}