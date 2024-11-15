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
  images: number;
}

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      color: "Đen",
      mileage: 50000,
      transmission: "Tự động",
      fuelType: "Xăng",
      fuelConsumption: 8.5,
      dailyRate: 500000,
      status: "Sẵn sàng",
      images: 4,
    },
    {
      make: "Honda",
      model: "Civic",
      year: 2021,
      color: "Trắng",
      mileage: 30000,
      transmission: "Số tay",
      fuelType: "Xăng",
      fuelConsumption: 7.0,
      dailyRate: 600000,
      status: "Đang thuê",
      images: 3,
    },
    {
      make: "Ford",
      model: "Focus",
      year: 2019,
      color: "Xanh",
      mileage: 45000,
      transmission: "Bán tự động",
      fuelType: "Dầu",
      fuelConsumption: 5.5,
      dailyRate: 550000,
      status: "Bảo dưỡng",
      images: 5,
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Quản Lí Xe Hơi</h2>

      {/* Form Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Thông Tin Xe</h3>
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
        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Thông Tin Bổ Sung</h3>
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
          </form>
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
                <td className="p-3">{car.images} ảnh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarManagement;
