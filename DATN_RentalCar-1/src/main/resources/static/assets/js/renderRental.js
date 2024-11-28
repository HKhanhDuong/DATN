function displayRentals() {
    console.log("Displaying rentals...");

    const carRentals = JSON.parse(localStorage.getItem('carRentals')) || [];
    const motorbikeRentals = JSON.parse(localStorage.getItem('motorbikeRentals')) || [];

    console.log("Car Rentals:", carRentals);
    console.log("Motorbike Rentals:", motorbikeRentals);

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

function fetchAndSaveRentalVehicles() {
    console.log("Fetching rental vehicles...");
    fetch('http://localhost:8080/api/rental-vehicle/rental-List', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Data fetched from API:", data);

        // Phân tách xe ô tô và xe máy
        const carRentals = data.filter(item => item.vehicleType === 'car');
        const motorbikeRentals = data.filter(item => item.vehicleType === 'motorbike');

        // Lưu dữ liệu vào localStorage
        localStorage.setItem('carRentals', JSON.stringify(carRentals));
        localStorage.setItem('motorbikeRentals', JSON.stringify(motorbikeRentals));

        console.log("Car rentals saved to localStorage:", carRentals);
        console.log("Motorbike rentals saved to localStorage:", motorbikeRentals);

        // Hiển thị danh sách thuê
        displayRentals();
    })
    .catch(error => {
        console.error('Error fetching rental vehicles:', error);
    });
}

// Gọi hàm fetch khi trang được load
document.addEventListener('DOMContentLoaded', fetchAndSaveRentalVehicles);
