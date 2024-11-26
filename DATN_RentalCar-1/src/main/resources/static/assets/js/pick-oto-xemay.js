document.addEventListener('DOMContentLoaded', () => {
	// Lấy các nút Xe Con và Xe Máy
	const carBtn = document.querySelector('.car-btn');
	const motorbikeBtn = document.querySelector('.motorbike-btn');
	const carList = document.querySelectorAll('.prod.car');
	const motorbikeList = document.querySelectorAll('.prod.motorbike');
	const sortingDropdown = document.getElementById('sorting-dropdown');
	const sortingText = document.getElementById('sorting-text');
	const sortingMenu = document.querySelector('.dropdown-menu');

	// Lưu trữ các lựa chọn người dùng
	let selectedModel = 'Vui lòng chọn';
	let selectedBrand = 'Vui lòng chọn';
	let selectedGearType = 'Vui lòng chọn';
	let selectedCity = 'Vui lòng chọn';
	let selectedDistrict = 'Vui lòng chọn';

	// URL API cho các loại xe
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

	// Hàm hiển thị và ẩn sản phẩm
	const showProductList = (productsToShow, productsToHide) => {
		productsToHide.forEach(product => product.style.display = 'none');
		productsToShow.forEach(product => product.style.display = 'block');
	};

	// Hàm thiết lập trạng thái 'active' cho nút
	const setActiveButton = (button) => {
		document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	};

	// Thiết lập dropdown với dữ liệu từ API
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

				options.forEach(option => {
					const optionElement = document.createElement('div');
					optionElement.classList.add('dropdown-item');
					optionElement.textContent = option;
					dropdown.appendChild(optionElement);

					optionElement.addEventListener('click', () => {
						selectedText.textContent = option;
						if (id === 'car-type') selectedModel = option;
						else if (id === 'car-brand') selectedBrand = option;
						else if (id === 'gear-type') selectedGearType = option;
						else if (id === 'city') selectedCity = option;
						else if (id === 'district') selectedDistrict = option;
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
		const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
		const vehicleType = carBtn.classList.contains('active') ? 'car' : 'motorbike';

		const productList = Array.from(vehicleType === 'car' ? carList : motorbikeList);
		const matchedProducts = productList.filter(product => {
			const productName = product.querySelector('.car-title, .motorbike-title').textContent.toLowerCase();
			const productModel = product.getAttribute('data-model');
			const productBrand = product.getAttribute('data-brand');
			const productGearType = product.getAttribute('data-gear');
			const productCity = product.getAttribute('data-city');
			const productDistrict = product.getAttribute('data-district');

			const matchesSearchQuery = searchQuery === '' || productName.includes(searchQuery);
			const matchesModel = selectedModel === 'Vui lòng chọn' || selectedModel.toLowerCase() === productModel.toLowerCase();
			const matchesBrand = selectedBrand === 'Vui lòng chọn' || selectedBrand.toLowerCase() === productBrand.toLowerCase();
			const matchesGearType = selectedGearType === 'Vui lòng chọn' || selectedGearType.toLowerCase() === productGearType.toLowerCase();
			const matchesCity = selectedCity === 'Vui lòng chọn' || selectedCity.toLowerCase() === productCity.toLowerCase();
			const matchesDistrict = selectedDistrict === 'Vui lòng chọn' || selectedDistrict.toLowerCase() === productDistrict.toLowerCase();

			return matchesSearchQuery && matchesModel && matchesBrand && matchesGearType && matchesCity && matchesDistrict;
		});

		showProductList(matchedProducts, productList.filter(product => !matchedProducts.includes(product)));
	};

	// Xử lý sự kiện khi nhấn vào nút "Tìm kiếm"
	document.querySelector('.search-btn').addEventListener('click', (event) => {
		event.preventDefault();
		filterVehicles();
	});

	// Xử lý dropdown sắp xếp
	sortingDropdown.addEventListener('click', () => {
		sortingMenu.style.display = sortingMenu.style.display === 'none' ? 'block' : 'none';
	});

	sortingMenu.addEventListener('click', (event) => {
		if (event.target.classList.contains('dropdown-item')) {
			const selectedSort = event.target.getAttribute('data-sort');
			sortingText.textContent = event.target.textContent;
			sortingMenu.style.display = 'none';

			// Gọi hàm sắp xếp sản phẩm
			sortProducts(selectedSort);
		}
	});

	// Hàm sắp xếp sản phẩm
	const sortProducts = (order) => {
		const productList = Array.from(document.querySelectorAll('.prod'));
		productList.sort((a, b) => {
			const priceA = parseFloat(a.getAttribute('data-price'));
			const priceB = parseFloat(b.getAttribute('data-price'));
			return order === 'asc' ? priceA - priceB : priceB - priceA;
		});

		const container = document.querySelector('.product-container');
		productList.forEach(product => container.appendChild(product));
	};

	// Xử lý chọn ngày

	// Xử lý cuộn trang
	window.addEventListener('scroll', () => {
		const rightColumn = document.querySelector('.right-column');
		if (window.scrollY > 0) rightColumn.classList.add('scrolled');
		else rightColumn.classList.remove('scrolled');
	});
});
