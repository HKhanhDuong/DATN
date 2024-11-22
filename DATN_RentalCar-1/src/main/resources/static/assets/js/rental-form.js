document.addEventListener('DOMContentLoaded', function() {
    const vehicleButtons = document.querySelectorAll('.vehicle-type .btn-select');
    
    vehicleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xóa active từ tất cả buttons
            vehicleButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm active vào button được click
            this.classList.add('active');
        });
    });
});