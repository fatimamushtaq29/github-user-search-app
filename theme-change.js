const theme = document.querySelector('.theme');
let darkMode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('darkMode', 'enabled');
}

const  disableDarkMode = () => {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
    enableDarkMode();
} else {
    disableDarkMode();
}

theme.addEventListener('click', themeChanger);

function themeChanger() {
    darkMode = localStorage.getItem('darkMode');
    if (!window.matchMedia('(prefers-color-scheme: light)').matches) {
        if (!document.body.hasAttribute('data-theme') || document.body.getAttribute('data-theme') === 'dark') {
            disableDarkMode();
            return;
        }
        enableDarkMode();
        return;
    }
    if (!document.body.hasAttribute('data-theme') || document.body.getAttribute('data-theme') === 'light') {
        enableDarkMode();
        return;
    }
    disableDarkMode();
    return;
    }