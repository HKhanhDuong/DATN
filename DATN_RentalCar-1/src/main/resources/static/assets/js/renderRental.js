function displayRentals() {
    const carRentals = JSON.parse(localStorage.getItem('carRentals')) || [];
    const motorbikeRentals = JSON.parse(localStorage.getItem('motorbikeRentals')) || [];

    const carTableBody = document.querySelector('#car-rentals tbody');
    const motorbikeTableBody = document.querySelector('#motorbike-rentals tbody');

    // Làm sạch bảng trước khi thêm dữ liệu
    carTableBody.innerHTML = '';
    motorbikeTableBody.innerHTML = '';

    // Thêm dữ liệu xe ô tô vào bảng
    carRentals.forEach(rental => {
        const row = `
            <tr>
                <td class="rental-table-cell">${rental.car.model}</td>
                <td class="rental-table-cell">${new Date(rental.rental.rentalDate).toLocaleDateString('vi-VN')}</td>
                <td class="rental-table-cell">${new Date(rental.rental.returnDate).toLocaleDateString('vi-VN')}</td>
                <td class="rental-table-cell">${rental.rental.renStatus}</td>
            </tr>
        `;
        carTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Thêm dữ liệu xe máy vào bảng
    motorbikeRentals.forEach(rental => {
        const row = `
            <tr>
                <td class="rental-table-cell">${rental.motorbike.model}</td>
                <td class="rental-table-cell">${new Date(rental.rental.rentalDate).toLocaleDateString('vi-VN')}</td>
                <td class="rental-table-cell">${new Date(rental.rental.returnDate).toLocaleDateString('vi-VN')}</td>
                <td class="rental-table-cell">${rental.rental.renStatus}</td>
            </tr>
        `;
        motorbikeTableBody.insertAdjacentHTML('beforeend', row);
    });
}
