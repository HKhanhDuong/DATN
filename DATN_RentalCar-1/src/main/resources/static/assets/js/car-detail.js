
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử modal
    const modal = document.getElementById("imageModal");
    if (!modal) return; // Dừng lại nếu modal không tồn tại
    // Lấy phần tử nút "Xem tất cả ảnh"
    const seeMoreButton = document.querySelector('.see-more-img');
    if (seeMoreButton) {
        seeMoreButton.addEventListener('click', function () {
            modal.style.display = "flex"; // Chỉ khi click vào nút thì modal mới hiển thị
            const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
            if (thumbnails.length > 0) {
                currentIndex = 0; // Bắt đầu từ ảnh đầu tiên
                zoomedImage.src = thumbnails[currentIndex].src; // Hiển thị ảnh đầu tiên mặc định
            }
        });
    }
    // Nút đóng modal
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = "none"; // Ẩn modal khi click vào nút đóng
        });
    }
    // Lấy tất cả các ảnh nhỏ và thiết lập chức năng click
    const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
    if (thumbnails.length > 0) {
        const zoomedImage = document.getElementById("zoomedImage");
        if (zoomedImage) {
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function () {
                    currentIndex = index; // Cập nhật chỉ mục ảnh hiện tại
                    zoomedImage.src = this.src; // Thay đổi ảnh lớn bằng ảnh được click
                });
            });
        }
    }
    // Lấy các nút mũi tên để di chuyển giữa các ảnh
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    if (leftArrow) {
        leftArrow.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            if (thumbnails.length > 0) {
                zoomedImage.src = thumbnails[currentIndex].src;
            }
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            if (thumbnails.length > 0) {
                zoomedImage.src = thumbnails[currentIndex].src;
            }
        });
    }

    // Khi người dùng nhấn vào bất kỳ đâu ngoài modal, đóng modal
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});


//tính tiền
function calculateTotalPrice(rentStartDate, rentStartTime, rentEndDate, rentEndTime, dailyRent, discount = 0) {
    // Chuyển đổi chuỗi ngày và giờ sang đối tượng Date
    const startDateTime = new Date(`${rentStartDate}T${rentStartTime}`);
    const endDateTime = new Date(`${rentEndDate}T${rentEndTime}`);

    // Tính thời gian thuê theo giờ
    const rentalHours = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60));

    // Giá bảo hiểm mỗi ngày
    const dailyInsurance = dailyRent * 0.05;

    let totalRent = 0;

    if (rentalHours < 12) {
        // Nếu thời gian thuê dưới 12 giờ
        if (rentalHours <= 4) {
            // Thuê dưới 4 giờ, tính giá là 1/4 giá 1 ngày
            totalRent = dailyRent / 4;
        } else {
            // Thuê trên 4 giờ, tính giá 1/4 giá 1 ngày cộng thêm 20% của giá 1 ngày cho mỗi 2 giờ sau 4 giờ
            const extraHours = rentalHours - 4;
            const extraCharges = Math.ceil(extraHours / 2) * (dailyRent * 0.2);
            totalRent = dailyRent / 4 + extraCharges;
        }
    } else {
        // Nếu thời gian thuê từ 12 giờ trở lên, tính giá là 1 ngày
        totalRent = dailyRent;
    }

    // Tính tiền bảo hiểm theo thời gian thuê
    const totalInsurance = (totalRent / dailyRent) * dailyInsurance;

    // Tổng tiền trước giảm giá
    const totalBeforeDiscount = totalRent + totalInsurance;

    // Tính tổng tiền sau khi áp dụng giảm giá
    const finalTotal = totalBeforeDiscount - discount;

    return finalTotal;
}

// Ví dụ sử dụng
const rentStartDate = "2024-10-01";
const rentStartTime = "07:00";
const rentEndDate = "2024-10-01";
const rentEndTime = "15:00";
const dailyRent = 1000;
const discount = 100;

const totalPrice = calculateTotalPrice(rentStartDate, rentStartTime, rentEndDate, rentEndTime, dailyRent, discount);
console.log("Tổng tiền thuê:", totalPrice);








////////////////////////////////////

// Thêm event listener cho nút "Tiếp tục"
saveDateTime.addEventListener("click", () => {
    const pickUpDate = document.getElementById("modalPickUpDate").value;
    const pickUpTime = document.getElementById("modalPickUpTime").value;
    const returnDate = document.getElementById("modalReturnDate").value;
    const returnTime = document.getElementById("modalReturnTime").value;
    const address = document.getElementById("address-input").value;

    const pickUpDateTime = `${pickUpDate} ${pickUpTime}`;
    const returnDateTime = `${returnDate} ${returnTime}`;

    // Kiểm tra nếu thời gian thuê dưới 2 giờ
    const pickUp = new Date(pickUpDateTime);
    const returnD = new Date(returnDateTime);
    const diffInHours = (returnD - pickUp) / (1000 * 60 * 60);
    if (diffInHours < 2) {
        errorMessage.style.display = "block";
        return;
    } else {
        errorMessage.style.display = "none";
    }

    // Gửi dữ liệu về backend bằng AJAX
    fetch("/api/rental", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pickUpDateTime: pickUpDateTime,
            returnDateTime: returnDateTime,
            address: address
        })
    })
    .then(response => response.json())
    .then(data => {
        // Xử lý kết quả từ backend
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    pickUpDateTimeElem.textContent = pickUpDateTime;
    returnDateTimeElem.textContent = returnDateTime;
    uniqueModal.style.display = "none";
});







