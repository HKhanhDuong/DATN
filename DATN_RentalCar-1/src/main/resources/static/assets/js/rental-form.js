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


document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra xem dữ liệu đã có trong localStorage chưa
    const rentalData = localStorage.getItem('rentalVehicles');

    if (rentalData) {
        // Nếu đã có dữ liệu trong localStorage, parse và render dữ liệu
        const parsedData = JSON.parse(rentalData);
        const carRentals = parsedData.filter(vehicle => vehicle.vehicleType === 'car');
        const motorbikeRentals = parsedData.filter(vehicle => vehicle.vehicleType === 'motorbike');
        
        renderRentalList('car', carRentals);
        renderRentalList('motorbike', motorbikeRentals);
    } else {
        // Nếu không có dữ liệu trong localStorage, gọi API để lấy dữ liệu
        fetch('/api/rental-vehicle/rental-List', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            // Lưu dữ liệu vào localStorage
            localStorage.setItem('rentalVehicles', JSON.stringify(data));

            // Phân loại dữ liệu theo loại xe
            const carRentals = data.filter(vehicle => vehicle.vehicleType === 'car');
            const motorbikeRentals = data.filter(vehicle => vehicle.vehicleType === 'motorbike');
            
            // Render dữ liệu vào bảng
            renderRentalList('car', carRentals);
            renderRentalList('motorbike', motorbikeRentals);
        })
        .catch(error => {
            console.error('Error fetching rental data:', error);
        });
    }

    function renderRentalList(vehicleType, rentals) {
        // Chọn tbody dựa trên loại xe
        const tbodyId = vehicleType === 'car' ? 'car-rentals-body' : 'motorbike-rentals-body';
        const tbody = document.getElementById(tbodyId);

        // Nếu không tìm thấy tbody thì dừng lại
        if (!tbody) {
            console.error('Không tìm thấy tbody:', tbodyId);
            return;
        }

        tbody.innerHTML = ''; // Xóa dữ liệu cũ trong tbody

        rentals.forEach(vehicle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.rentalDate}</td>
                <td>${vehicle.returnDate}</td>
                <td>${vehicle.status}</td>
            `;
            tbody.appendChild(row);
        });
    }
});


function renderRentalList(vehicleType, rentals) {
    const tbodyId = vehicleType === 'car' ? 'car-rentals-body' : 'motorbike-rentals-body';
    const tbody = document.getElementById(tbodyId);

    // Kiểm tra nếu tbody tồn tại
    if (!tbody) {
        console.error('Không tìm thấy tbody:', tbodyId);
        return;
    }

    // Xóa dữ liệu cũ
    tbody.innerHTML = '';

    // Lặp qua từng xe trong danh sách và thêm vào bảng
    rentals.forEach(vehicle => {
        const row = document.createElement('tr');

        // Nếu là xe ô tô hoặc xe máy, lấy chi tiết từ trường `car` hoặc `motorbike`
        const vehicleDetails = vehicle.car || vehicle.motorbike || {};
        const rentalDetails = vehicle.rental || {};

        row.innerHTML = `
            <td>${vehicleDetails.make || 'N/A'}</td> <!-- Tên xe -->
            <td>${rentalDetails.rentalDate || 'N/A'}</td> <!-- Ngày thuê -->
            <td>${rentalDetails.returnDate || 'N/A'}</td> <!-- Ngày trả -->
            <td>${rentalDetails.status || 'N/A'}</td> <!-- Trạng thái -->
        `;
        tbody.appendChild(row);
    });
}
