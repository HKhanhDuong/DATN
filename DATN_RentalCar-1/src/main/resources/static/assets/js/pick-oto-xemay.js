document.addEventListener('DOMContentLoaded', () => {
	// Lấy các nút Xe Con và Xe Máy
	const carBtn = document.querySelector('.car-btn');
	const motorbikeBtn = document.querySelector('.motorbike-btn');
	const carList = document.querySelectorAll('.prod.car'); // Các sản phẩm xe con
	const motorbikeList = document.querySelectorAll('.prod.motorbike'); // Các sản phẩm xe máy
	


	let selectedModel = 'Vui lòng chọn';
	let selectedBrand = 'Vui lòng chọn';
	let selectedGearType = 'Vui lòng chọn';
	let selectedCity = 'Vui lòng chọn';
	let selectedDistrict = 'Vui lòng chọn';


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

	// Hàm hiển thị các sản phẩm và ẩn sản phẩm không cần thiết
	const showProductList = (productsToShow, productsToHide) => {
		productsToHide.forEach(product => product.style.display = 'none');
		productsToShow.forEach(product => product.style.display = 'block');
	};

	// Hàm thiết lập trạng thái 'active' cho nút
	const setActiveButton = (button) => {
		document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	};

	// Hàm thiết lập dropdown với dữ liệu từ API
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

		// Lấy dữ liệu từ API và thêm vào dropdown
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

					// Cập nhật giá trị khi click vào tùy chọn
					optionElement.addEventListener('click', () => {
						selectedText.textContent = option;  // Cập nhật giá trị trong dropdown
						if (id === 'car-type') {
							selectedModel = option;
						} else if (id === 'car-brand') {
							selectedBrand = option;
						} else if (id === 'gear-type') {
							selectedGearType = option;
						} else if (id === 'city') {
							selectedCity = option;
						} else if (id === 'district') {
							selectedDistrict = option;
						}
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


	// Cập nhật dropdown theo loại xe đã chọn
	const updateDropdowns = (vehicleType) => {
		setupDropdown('car-type', apiUrls[vehicleType].model);
		setupDropdown('car-brand', apiUrls[vehicleType].make);
	};

	// Xử lý sự kiện click cho nút "Xe Con"
	carBtn.addEventListener('click', () => {
		setActiveButton(carBtn);
		showProductList(carList, motorbikeList);
		localStorage.setItem('selectedVehicle', 'car');
		updateDropdowns('car');
	});

	// Xử lý sự kiện click cho nút "Xe Máy"
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

	// Hàm lọc xe theo các điều kiện mà người dùng đã chọn
	const filterVehicles = () => {
		console.log("Hàm filterVehicles đã được gọi!");

		const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
		const vehicleType = carBtn.classList.contains('active') ? 'car' : 'motorbike';

		console.log("searchQuery:", searchQuery);
		console.log("selectedModel:", selectedModel);
		console.log("selectedBrand:", selectedBrand);
		console.log("selectedGearType:", selectedGearType);
		console.log("selectedCity:", selectedCity);
		console.log("selectedDistrict:", selectedDistrict);

		// Bắt đầu lọc sản phẩm theo các điều kiện đã chọn
		const productList = Array.from(vehicleType === 'car' ? carList : motorbikeList);
		const matchedProducts = [];

		productList.forEach(product => {
			const productName = product.querySelector('.car-title, .motorbike-title').textContent;
			const productModel = product.getAttribute('data-model');
			const productBrand = product.getAttribute('data-brand');	
			const productGearType = product.getAttribute('data-gear');
			const productCity = product.getAttribute('data-city');
			const productDistrict = product.getAttribute('data-district');

			// Kiểm tra các điều kiện lọc, chỉ lọc nếu giá trị không phải "Vui lòng chọn"
			const matchesSearchQuery = searchQuery === '' || productName.toLowerCase().includes(searchQuery);
			const matchesModel = selectedModel !== 'Vui lòng chọn' ? selectedModel.toLowerCase() === productModel.toLowerCase() : true;
			const matchesBrand = selectedBrand !== 'Vui lòng chọn' ? selectedBrand.toLowerCase() === productBrand.toLowerCase() : true;
			const matchesGearType = selectedGearType !== 'Vui lòng chọn' ? selectedGearType.toLowerCase() === productGearType.toLowerCase() : true;
			const matchesCity = selectedCity !== 'Vui lòng chọn' ? selectedCity.toLowerCase() === productCity.toLowerCase() : true;
			const matchesDistrict = selectedDistrict !== 'Vui lòng chọn' ? selectedDistrict.toLowerCase() === productDistrict.toLowerCase() : true;

			// Log để kiểm tra điều kiện lọc
			console.log("matchesSearchQuery:", matchesSearchQuery);
			console.log("matchesModel:", matchesModel);
			console.log("matchesBrand:", matchesBrand);
			console.log("matchesGearType:", matchesGearType);
			console.log("matchesCity:", matchesCity);
			console.log("matchesDistrict:", matchesDistrict);

			// Nếu tất cả các điều kiện lọc đều thỏa mãn, thêm sản phẩm vào danh sách khớp
			if (matchesSearchQuery && matchesModel && matchesBrand && matchesGearType && matchesCity && matchesDistrict) {
				matchedProducts.push(product); // Thêm sản phẩm vào danh sách khớp
			}
		});

		// Nếu không có sản phẩm nào khớp, ẩn tất cả
		if (matchedProducts.length === 0) {
			showProductList([], productList); // Ẩn tất cả sản phẩm
			console.log("Không có sản phẩm nào khớp với các tiêu chí");
		} else {
			showProductList(matchedProducts, productList.filter(product => !matchedProducts.includes(product)));
			console.log('Sản phẩm khớp với các tiêu chí:', matchedProducts);
		}
	};



	// Sự kiện khi nhấn vào nút "Tìm kiếm"
	document.querySelector('.search-btn').addEventListener('click', (event) => {
		event.preventDefault();
		console.log("Nút tìm kiếm được click");
		filterVehicles();
	});

	
	
	// Xử lý chọn ngày
	const startDateBtn = document.getElementById('start-date-btn');
	const endDateBtn = document.getElementById('end-date-btn');

	if (startDateBtn) {
		startDateBtn.addEventListener('click', () => alert('Chọn ngày bắt đầu'));
	}

	if (endDateBtn) {
		endDateBtn.addEventListener('click', () => alert('Chọn ngày kết thúc'));
	}

	// Xử lý cuộn trang
	window.addEventListener('scroll', () => {
		const rightColumn = document.querySelector('.right-column');
		if (window.scrollY > 0) {
			rightColumn.classList.add('scrolled');
		} else {
			rightColumn.classList.remove('scrolled');
		}
	});
});
