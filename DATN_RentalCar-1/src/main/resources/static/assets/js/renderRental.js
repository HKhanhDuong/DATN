// Hiển thị các thông tin thuê xe từ LocalStorage
function displayRentals() {
    console.log("Displaying rentals...");

    const carRentals = getRentalsFromLocalStorage('carRentals');
    const motorbikeRentals = getRentalsFromLocalStorage('motorbikeRentals');

    console.log("Car Rentals:", carRentals);
    console.log("Motorbike Rentals:", motorbikeRentals);

    const carTableBody = document.querySelector('#car-rentals tbody');
    const motorbikeTableBody = document.querySelector('#motorbike-rentals tbody');

    // Làm sạch bảng trước khi thêm dữ liệu
    carTableBody.innerHTML = '';
    motorbikeTableBody.innerHTML = '';

    // Thêm dữ liệu xe ô tô vào bảng
    carRentals.forEach((rental, index) => {
        const row = createRentalRow(rental, index, 'car');
        carTableBody.appendChild(row);
    });

    // Thêm dữ liệu xe máy vào bảng
    motorbikeRentals.forEach((rental, index) => {
        const row = createRentalRow(rental, index, 'motorbike');
        motorbikeTableBody.appendChild(row);
    });
}

// Tạo một dòng trong bảng hiển thị thông tin thuê xe
function createRentalRow(rental, index, vehicleType) {
    const renStatus = rental.rental.renStatus; // Lấy trạng thái thuê xe
	
	console.log(renStatus)
	
    const isCar = vehicleType === 'car';

    // Chỉ hiển thị nút huỷ khi trạng thái là "Chờ xác nhận"
    const cancelButton = renStatus === 'Chờ xác nhận' 
        ? `<button class="btn btn-danger btn-sm" onclick="cancelRental(${index}, '${vehicleType}')">Huỷ</button>` 
        : '';  

    const row = document.createElement('tr');

    if (isCar) {
        row.innerHTML = `
            
			<td class="rental-table-cell">${rental.car.make} ${rental.car.model} ${rental.car.year} </td>
            <td class="rental-table-cell">${new Date(rental.rental.rentalDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${new Date(rental.rental.returnDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${renStatus}</td>
            <td class="rental-table-cell">${cancelButton}</td>
        `;
    } else {    
        row.innerHTML = `
            <td class="rental-table-cell">${rental.motorbike.model}</td>
            <td class="rental-table-cell">${new Date(rental.rental.rentalDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${new Date(rental.rental.returnDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${renStatus}</td>
        `;
    }

    return row;
}

// Hàm huỷ thuê xe
function cancelRental(index, vehicleType) {
    console.log(`Canceling rental for ${vehicleType} at index: ${index}`);

    const rentalList = getRentalsFromLocalStorage(vehicleType === 'car' ? 'carRentals' : 'motorbikeRentals');
    const rental = rentalList[index];

    // Cập nhật trạng thái "Đã huỷ" trong localStorage
    rental.rental.renStatus = 'Đã huỷ';

    // Lưu lại vào localStorage
    saveRentalsToLocalStorage(vehicleType === 'car' ? 'carRentals' : 'motorbikeRentals', rentalList);

    // Cập nhật UI ngay lập tức
    displayRentals();

    // Gửi PUT request đến backend để cập nhật trạng thái
    fetch(`http://localhost:8080/api/rental/cancel/${rental.rental.rentalId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            renStatus: 'Đã huỷ',
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(data => {
        if (data && data.renStatus === 'Đã huỷ') {
            alert('Đã huỷ thành công');
        } else {
            console.error('Error: Response does not contain updated rental data');
            alert('Cập nhật trạng thái thất bại');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi cập nhật trạng thái.');
    });
}

// Hàm lấy và lưu dữ liệu thuê xe từ LocalStorage
function getRentalsFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveRentalsToLocalStorage(key, rentals) {
    localStorage.setItem(key, JSON.stringify(rentals));
}

// Lấy dữ liệu từ API và lưu vào LocalStorage
function fetchAndSaveRentalVehicles() {
    console.log("Fetching rental vehicles...");
    fetch('http://localhost:8080/api/rental-vehicle/rental-List', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Data fetched from API:", data);

        // Phân tách xe ô tô và xe máy
        const carRentals = data.filter(item => item.vehicleType === 'car');
        const motorbikeRentals = data.filter(item => item.vehicleType === 'motorbike');

        // Lưu dữ liệu vào LocalStorage
        saveRentalsToLocalStorage('carRentals', carRentals);
        saveRentalsToLocalStorage('motorbikeRentals', motorbikeRentals);

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
