import React from "react";
import 'tailwindcss/tailwind.css';

const AccountSettings = () => {
  return (
    
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-wrap bg-white shadow-md rounded-lg p-6 space-y-4 md:space-y-0">
        {/* Profile Image Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center pb-6 md:pb-0">
          <input type="file" id="avatarInput" className="hidden" accept="image/*" />
          <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden mb-4 flex items-center justify-center">
            <img
              id="avatar"
              src="assets/img/user-icon-on-transparent-background-free-png.png"
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="bg-green-500 text-white p-4 rounded">
  Nếu bạn thấy khối màu xanh lá này, Tailwind CSS đang hoạt động!
</div>

          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Ảnh Mới</button>
          <button className="bg-red-500 text-white py-2 px-4 rounded mt-2">Xoá Ảnh Đại Diện</button>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-2/3 flex flex-col space-y-6 md:flex-row md:space-x-6">
          {/* Personal Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Chỉnh Sửa Thông Tin Cá Nhân</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Họ Và Tên
                </label>
                <input type="text" id="name" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input type="email" id="email" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Số Điện Thoại
                </label>
                <input type="text" id="phone" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700 mb-2">
                  Địa Chỉ
                </label>
                <input type="text" id="address" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
            </form>
          </div>

          {/* Login Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Thông Tin Đăng Nhập</h2>
            <form className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label htmlFor="day" className="block text-gray-700 mb-2">
                    Ngày
                  </label>
                  <select id="day" className="w-full border border-gray-300 rounded px-4 py-2">
                    {[...Array(31)].map((_, index) => (
                      <option key={index}>{String(index + 1).padStart(2, "0")}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="month" className="block text-gray-700 mb-2">
                    Tháng
                  </label>
                  <select id="month" className="w-full border border-gray-300 rounded px-4 py-2">
                    {[...Array(12)].map((_, index) => (
                      <option key={index}>{String(index + 1).padStart(2, "0")}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="year" className="block text-gray-700 mb-2">
                    Năm
                  </label>
                  <select id="year" className="w-full border border-gray-300 rounded px-4 py-2">
                    {Array.from({ length: 50 }, (_, i) => 1980 + i).map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-2">
                  Tên Đăng Nhập
                </label>
                <input type="text" id="username" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Mật Khẩu
                </label>
                <input type="password" id="password" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label htmlFor="role" className="block text-gray-700 mb-2">
                  Vai Trò
                </label>
                <select id="role" className="w-full border border-gray-300 rounded px-4 py-2">
                  <option value="admin">Quản Lý</option>
                  <option value="Employees">Nhân Viên</option>
                  <option value="Driver">Tài Xế</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
