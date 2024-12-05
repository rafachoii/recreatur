async function isUserLoggedIn() {
    try {
        const response = await fetch('http://127.0.0.1:3333/auth/verify', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();
        return data.loggedIn;
    } catch (e) {
        return false;
    }
}

async function updateNavbarForLoggedInUser() {
    const loginLinkDesktop = document.getElementById("loginLink");
    const loginLinkMobile = document.getElementById("loginLinkMobile");

    const loggedIn = await isUserLoggedIn();

    if (loggedIn) {
        if (loginLinkDesktop) {
            loginLinkDesktop.textContent = "Dashboard";
            loginLinkDesktop.href = "dashboard.html";
        }

        if (loginLinkMobile) {
            loginLinkMobile.textContent = "Dashboard";
            loginLinkMobile.href = "dashboard.html";
        }
    } else {
        if (loginLinkDesktop) {
            loginLinkDesktop.textContent = "Entrar";
            loginLinkDesktop.href = "tela_login.html";
        }

        if (loginLinkMobile) {
            loginLinkMobile.textContent = "Entrar";
            loginLinkMobile.href = "tela_login.html";
        }
    }
}

window.onload = function () {
    updateNavbarForLoggedInUser();
};