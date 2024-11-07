document.addEventListener('DOMContentLoaded', () => {
	// Lấy các nút Xe Con và Xe Máy
	const carBtn = document.querySelector('.car-btn');
	const motorbikeBtn = document.querySelector('.motorbike-btn');
	const carList = document.querySelectorAll('.prod.car');  // Các sản phẩm xe con
	const motorbikeList = document.querySelectorAll('.prod.motorbike');  // Các sản phẩm xe máy

	// Biến lưu API cho từng loại xe
	const apiUrls = {
		car: {
			model: '/api/car/models',
			make: '/api/car/makes'
		},
		motorbike: {
			model: '/api/motorbikes/models',
			make: '/api/motorbikes/makes'
		}
	};

	// Hàm để hiển thị danh sách sản phẩm và ẩn sản phẩm không cần thiết
	const showProductList = (productsToShow, productsToHide) => {
		productsToHide.forEach(product => product.style.display = 'none');
		productsToShow.forEach(product => product.style.display = 'block');
	};

	// Hàm để thiết lập trạng thái 'active' cho nút
	const setActiveButton = (button) => {
		document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	};

	// Hàm thiết lập dropdown
	const setupDropdown = (id, apiUrl) => {
		const arrow = document.getElementById(id);
		if (!arrow) return;

		const dropdown = document.createElement('div');
		dropdown.classList.add('dropdown-menu');
		dropdown.style.display = 'none';

		const selectedText = document.createElement('span');
		selectedText.classList.add('selected-text');
		selectedText.textContent = 'Vui lòng chọn';
		arrow.parentNode.insertBefore(selectedText, arrow.nextSibling);

		// Hàm fetch dữ liệu từ API và thêm vào dropdown
		const fetchOptionsForDropdown = async () => {
			try {
				const response = await fetch(apiUrl);
				if (!response.ok) throw new Error('Network response was not ok');

				const options = await response.json();
				dropdown.innerHTML = '';
				if (options.length === 0) {
					const noOptionsMessage = document.createElement('div');
					noOptionsMessage.textContent = 'Không có tùy chọn nào';
					dropdown.appendChild(noOptionsMessage);
					return;
				}

				options.forEach(option => {
					const optionElement = document.createElement('div');
					optionElement.classList.add('dropdown-item');
					optionElement.textContent = option;
					dropdown.appendChild(optionElement);

					optionElement.addEventListener('click', () => {
						selectedText.textContent = option;
						dropdown.style.display = 'none';
					});
				});
			} catch (error) {
				console.error('Failed to fetch options:', error);
			}
		};

		fetchOptionsForDropdown();
		arrow.parentNode.appendChild(dropdown);
		arrow.addEventListener('click', () => {
			dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
		});
	};

	// Cập nhật dropdown khi chọn loại xe
	const updateDropdowns = (vehicleType) => {
		setupDropdown('car-type', apiUrls[vehicleType].model);
		setupDropdown('car-brand', apiUrls[vehicleType].make);
	};

	// Sự kiện click cho nút "Xe Con"
	carBtn.addEventListener('click', () => {
		setActiveButton(carBtn);
		showProductList(carList, motorbikeList);
		localStorage.setItem('selectedVehicle', 'car');
		updateDropdowns('car');
	});

	// Sự kiện click cho nút "Xe Máy"
	motorbikeBtn.addEventListener('click', () => {
		setActiveButton(motorbikeBtn);
		showProductList(motorbikeList, carList);
		localStorage.setItem('selectedVehicle', 'motorbike');
		updateDropdowns('motorbike');
	});

	// Hiển thị loại xe đã chọn trước đó và cập nhật dropdown
	const selectedVehicle = localStorage.getItem('selectedVehicle') || 'car';
	if (selectedVehicle === 'car') {
		setActiveButton(carBtn);
		showProductList(carList, motorbikeList);
	} else {
		setActiveButton(motorbikeBtn);
		showProductList(motorbikeList, carList);
	}
	updateDropdowns(selectedVehicle);


	// Hàm lọc xe dựa trên các điều kiện người dùng đã chọn
	const filterVehicles = () => {
		console.log("Hàm filterVehicles đã được gọi!");
		
		const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
		const vehicleType = localStorage.getItem('selectedVehicle') || 'car';
		const selectedModel = document.querySelector('#car-type .selected-text').textContent;
		const selectedBrand = document.querySelector('#car-brand .selected-text').textContent;
		const selectedGearType = document.querySelector('#gear-type .selected-text').textContent;
		const selectedCity = document.querySelector('#city .selected-text').textContent;
		const selectedDistrict = document.querySelector('#district .selected-text').textContent;

		// Lọc sản phẩm
		const productList = vehicleType === 'car' ? carList : motorbikeList;
		const productsToShow = [];
		const productsToHide = [];

		productList.forEach(product => {
			const productName = product.querySelector('.car-title, .motorbike-title').textContent.toLowerCase();
			const productModel = product.getAttribute('data-model');
			const productBrand = product.getAttribute('data-brand');
			const productGearType = product.getAttribute('data-gear');
			const productCity = product.getAttribute('data-city');
			const productDistrict = product.getAttribute('data-district');

			// Điều kiện lọc
			const matchesSearch = searchQuery === '' || productName.includes(searchQuery);
			const matchesModel = selectedModel === 'Vui lòng chọn' || selectedModel === productModel;
			const matchesBrand = selectedBrand === 'Vui lòng chọn' || selectedBrand === productBrand;
			const matchesGearType = selectedGearType === 'Vui lòng chọn' || selectedGearType === productGearType;
			const matchesCity = selectedCity === 'Vui lòng chọn' || selectedCity === productCity;
			const matchesDistrict = selectedDistrict === 'Vui lòng chọn' || selectedDistrict === productDistrict;

			// Thêm sản phẩm vào danh sách hiển thị hoặc ẩn
			if (matchesSearch && matchesModel && matchesBrand && matchesGearType && matchesCity && matchesDistrict) {
				productsToShow.push(product);
			} else {
				productsToHide.push(product);
			}
		});

		// In ra danh sách sản phẩm hiển thị và ẩn
		console.log('Sản phẩm sẽ hiển thị:', productsToShow);
		console.log('Sản phẩm sẽ ẩn:', productsToHide);

		// Cập nhật danh sách sản phẩm
		showProductList(productsToShow, productsToHide);
	};

	// Sự kiện khi nhấn vào nút "Tìm kiếm"
	document.querySelector('.search-btn').addEventListener('click', filterVehicles);



	// --- Xử lý chọn ngày ---
	const startDateBtn = document.getElementById('start-date-btn');
	const endDateBtn = document.getElementById('end-date-btn');

	if (startDateBtn) {
		startDateBtn.addEventListener('click', () => alert('Chọn ngày bắt đầu'));
	}

	if (endDateBtn) {
		endDateBtn.addEventListener('click', () => alert('Chọn ngày kết thúc'));
	}

	// --- Xử lý cuộn ---
	window.addEventListener('scroll', () => {
		const rightColumn = document.querySelector('.right-column');
		if (window.scrollY > 0) {
			rightColumn.classList.add('scrolled');
		} else {
			rightColumn.classList.remove('scrolled');
		}
	});
});
