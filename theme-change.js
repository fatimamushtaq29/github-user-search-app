const theme = document.querySelector('.theme');

theme.addEventListener('click', themeChanger);

function themeChanger() {
    const themeName = document.querySelector('.theme-name');
    if (document.body.hasAttribute('data-theme')) {
        document.body.removeAttribute('data-theme');
        themeName.innerText = 'DARK';
    }
    else if (!document.body.hasAttribute('data-theme')) {
        document.body.setAttribute('data-theme', 'dark');
        themeName.innerText = 'LIGHT';
    }
}