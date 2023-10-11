const switchTheme = () => {
    console.log('Switching theme...');
    const rootElement = document.documentElement; 
    let dataTheme = rootElement.getAttribute('data-theme'); 
    let newTheme = (dataTheme === 'light') ? 'dark' : 'light'; 
    rootElement.setAttribute('data-theme', newTheme); 

    if (typeof window.themeChanged === 'function') {
        window.themeChanged(newTheme);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#theme-switcher').addEventListener('click', switchTheme);
});