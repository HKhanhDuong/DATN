document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
        // Toggle active class
        section.classList.toggle('active');
        
        // Toggle collapse content
        const collapse = section.querySelector('.collapse');
        collapse.classList.toggle('show');
    });
});