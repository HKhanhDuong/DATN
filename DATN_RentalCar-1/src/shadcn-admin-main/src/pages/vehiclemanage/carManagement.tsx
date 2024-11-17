import React, { useState } from "react";

interface Car {
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  fuelConsumption: number;
  dailyRate: number;
  status: string;
  images: string[]; // Tập hợp các ảnh (1 ảnh chính và tối đa 4 ảnh phụ)
}

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      make: "Toyota1",
      model: "Camry",
      year: 2020,
      color: "Đen",
      mileage: 50000,
      transmission: "Tự động",
      fuelType: "Xăng",
      fuelConsumption: 8.5,
      dailyRate: 500000,
      status: "Sẵn sàng",
      images: ["mainImage.png", "image1.png", "image2.png", "image3.png", "image4.png"],
    },
    {
      make: "Toyota2",
      model: "Camry",
      year: 2020,
      color: "Xanh",
      mileage: 50000,
      transmission: "Số tay",
      fuelType: "Dầu",
      fuelConsumption: 8.5,
      dailyRate: 500000,
      status: "Sẵn sàng",
      images: ["mainImage.png", "image1.png", "image2.png", "image3.png", "image4.png"],
    }, {
      make: "Toyota3",
      model: "Camry",
      year: 2020,
      color: "Vàng",
      mileage: 50000,
      transmission: "Bán Tự Động",
      fuelType: "Điện",
      fuelConsumption: 8.5,
      dailyRate: 500000,
      status: "Sẵn sàng",
      images: ["mainImage.png", "image1.png", "image2.png", "image3.png", "image4.png"],
    }
    
  ]);

  const handleAdd = () => {
    alert("Thêm xe mới!");
  };

  const handleEdit = () => {
    alert("Chỉnh sửa xe!");
  };

  const handleDelete = () => {
    alert("Xóa xe!");
  };

  const handleReset = () => {
    alert("Làm mới thông tin!");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Quản Lí Xe Hơi</h2>

      {/* Form Section */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Upload Image Section */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Tải lên ảnh của xe</h3>
          <div className="border-dashed border-2 border-gray-400 rounded-lg h-48 flex flex-col items-center justify-center text-gray-500 mb-4">
            <p className="font-medium">Ảnh Toàn Xe</p>
            <p className="text-sm text-gray-400">Kích thước: 1200 x 600 px • JPG, PNG</p>
            <p className="text-sm text-gray-400">Dung lượng tối đa: 5 MB</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Ảnh Đầu Xe", "Ảnh Đuôi Xe", "Ảnh Vô Lăng", "Ảnh Có Tài Xế"].map((label, index) => (
              <div
                key={index}
                className="border-dashed border-2 border-gray-400 rounded-lg h-24 flex flex-col items-center justify-center text-gray-500"
              >
                <p className="font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Thông Tin Xe */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Thông Tin Xe</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="make" className="block font-medium">
                Hãng xe
              </label>
              <input type="text" id="make" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="model" className="block font-medium">
                Mẫu xe
              </label>
              <input type="text" id="model" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="year" className="block font-medium">
                Năm sản xuất
              </label>
              <input type="number" id="year" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="color" className="block font-medium">
                Màu sắc
              </label>
              <input type="text" id="color" className="w-full p-2 border rounded" />
            </div>
          </form>
        </div>

        {/* Thông Tin Bổ Sung + CRUD Buttons */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Thông Tin Bổ Sung</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="transmission" className="block font-medium">
                Hộp số
              </label>
              <select id="transmission" className="w-full p-2 border rounded">
                <option value="Tự động">Tự động</option>
                <option value="Số tay">Số tay</option>
                <option value="Bán tự động">Bán tự động</option>
              </select>
            </div>
            <div>
              <label htmlFor="fuelType" className="block font-medium">
                Loại Nhiên Liệu
              </label>
              <select id="fuelType" className="w-full p-2 border rounded">
                <option value="Xăng">Xăng</option>
                <option value="Dầu">Dầu</option>
                <option value="Điện">Điện</option>
              </select>
            </div>
            <div>
              <label htmlFor="dailyRate" className="block font-medium">
                Giá thuê mỗi ngày (VND)
              </label>
              <input type="number" id="dailyRate" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="status" className="block font-medium">
                Trạng thái
              </label>
              <select id="status" className="w-full p-2 border rounded">
                <option value="Sẵn sàng">Sẵn sàng</option>
                <option value="Đang thuê">Đang thuê</option>
                <option value="Bảo dưỡng">Bảo dưỡng</option>
              </select>
            </div>
          </form>

          {/* CRUD Buttons */}
          <div className="flex justify-start space-x-4 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thêm
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Làm Mới
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium">Hãng Xe</th>
              <th className="p-3 text-left font-medium">Mẫu Xe</th>
              <th className="p-3 text-left font-medium">Năm Sản Xuất</th>
              <th className="p-3 text-left font-medium">Màu Sắc</th>
              <th className="p-3 text-left font-medium">Số Km</th>
              <th className="p-3 text-left font-medium">Hộp Số</th>
              <th className="p-3 text-left font-medium">Loại Nhiên Liệu</th>
              <th className="p-3 text-left font-medium">Tiêu Thụ (L/100km)</th>
              <th className="p-3 text-left font-medium">Giá Thuê (VND)</th>
              <th className="p-3 text-left font-medium">Trạng Thái</th>
              <th className="p-3 text-left font-medium">Ảnh</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{car.make}</td>
                <td className="p-3">{car.model}</td>
                <td className="p-3">{car.year}</td>
                <td className="p-3">{car.color}</td>
                <td className="p-3">{car.mileage.toLocaleString()} km</td>
                <td className="p-3">{car.transmission}</td>
                <td className="p-3">{car.fuelType}</td>
                <td className="p-3">{car.fuelConsumption.toFixed(1)}</td>
                <td className="p-3">{car.dailyRate.toLocaleString()} VND</td>
                <td className="p-3">{car.status}</td>
                <td className="p-3">{car.images.length} ảnh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarManagement;
