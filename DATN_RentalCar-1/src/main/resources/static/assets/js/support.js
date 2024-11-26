document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
        section.classList.toggle('active');
        const collapse = section.querySelector('.collapse');
        collapse.classList.toggle('show');
    });
});