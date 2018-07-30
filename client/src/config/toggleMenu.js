window.addEventListener('load', () => {
    const toggleMenuButton = document.getElementById('toggle-menu');

    if (toggleMenuButton) {
        toggleMenuButton.addEventListener('click', function (e) {
            const menuSelector = this.getAttribute('data-target');
            const menuElement = document.querySelector(menuSelector);
    
            if (!menuElement) {
                return false;
            }
    
            const showMenuClass = 'show-menu';
            const isOpened = menuElement.classList.contains(showMenuClass);
    
            if (isOpened) {
                menuElement.classList.remove(showMenuClass);
            } else {
                menuElement.classList.add(showMenuClass);
            }
        });
    }
});