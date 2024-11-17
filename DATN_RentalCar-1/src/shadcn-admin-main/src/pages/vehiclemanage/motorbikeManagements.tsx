import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react"; // Import các icon từ thư viện Lucide

interface Motorbike {
  make: string;
  model: string;
  condition: string;
  year: number;
  color: string;
  mileage: number;
  fuelType: string;
  fuelConsumption: number;
  dailyRate: number;
  status: string;
  engineCapacity: number;
  facilities: string;
  vehicleLocation: string;
  percentDiscount: number;
  images: string[]; // Tập hợp các ảnh
}

const MotorbikeManagement: React.FC = () => {
  const [motorbike, setMotorbike] = useState<Motorbike>({
    make: "",
    model: "",
    condition: "Good",
    year: 2023,
    color: "",
    mileage: 0,
    fuelType: "Petrol",
    fuelConsumption: 0,
    dailyRate: 0,
    status: "Sẵn sàng",
    engineCapacity: 150,
    facilities: "",
    vehicleLocation: "",
    percentDiscount: 0,
    images: [],
  });

  const [motorbikes, setMotorbikes] = useState<Motorbike[]>([
    {
      make: "Yamaha",
      model: "Exciter",
      condition: "Good",
      year: 2020,
      color: "Blue",
      mileage: 15000,
      fuelType: "Petrol",
      fuelConsumption: 2.2,
      dailyRate: 120000,
      status: "Sẵn sàng",
      engineCapacity: 150,
      facilities: "Helmet, GPS",
      vehicleLocation: "Hà Nội",
      percentDiscount: 10,
      images: ["exciter2020-main.jpg", "exciter2020-front.jpg", "exciter2020-back.jpg"],
    },
    {
      make: "Honda",
      model: "Winner X",
      condition: "Excellent",
      year: 2021,
      color: "Red",
      mileage: 10000,
      fuelType: "Petrol",
      fuelConsumption: 2.5,
      dailyRate: 140000,
      status: "Đang thuê",
      engineCapacity: 150,
      facilities: "Helmet",
      vehicleLocation: "TP. HCM",
      percentDiscount: 5,
      images: ["winner2021-main.jpg", "winner2021-front.jpg", "winner2021-back.jpg"],
    },
    {
      make: "Suzuki",
      model: "Raider",
      condition: "Good",
      year: 2019,
      color: "Black",
      mileage: 20000,
      fuelType: "Petrol",
      fuelConsumption: 2.0,
      dailyRate: 100000,
      status: "Bảo dưỡng",
      engineCapacity: 150,
      facilities: "Helmet, Gloves",
      vehicleLocation: "Đà Nẵng",
      percentDiscount: 15,
      images: ["raider2019-main.jpg", "raider2019-front.jpg", "raider2019-back.jpg"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setMotorbike((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = () => {
    setMotorbikes([...motorbikes, motorbike]);
    handleReset();
  };

  const handleReset = () => {
    setMotorbike({
      make: "",
      model: "",
      condition: "Good",
      year: 2023,
      color: "",
      mileage: 0,
      fuelType: "Petrol",
      fuelConsumption: 0,
      dailyRate: 0,
      status: "Sẵn sàng",
      engineCapacity: 150,
      facilities: "",
      vehicleLocation: "",
      percentDiscount: 0,
      images: [],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFillForm = (bike: Motorbike) => {
    setMotorbike(bike);
  };

  const handleDelete = (index: number) => {
    const updatedMotorbikes = motorbikes.filter((_, i) => i !== index);
    setMotorbikes(updatedMotorbikes);
  };

  const filteredMotorbikes = motorbikes.filter(
    (bike) =>
      bike.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Quản Lý Xe Máy</h2>

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
            {["Ảnh Đầu Xe", "Ảnh Đuôi Xe", "Ảnh Đồng Hồ", "Ảnh Phụ"].map((label, index) => (
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
              <input
                type="text"
                id="make"
                value={motorbike.make}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="model" className="block font-medium">
                Mẫu xe
              </label>
              <input
                type="text"
                id="model"
                value={motorbike.model}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="year" className="block font-medium">
                Năm sản xuất
              </label>
              <input
                type="number"
                id="year"
                value={motorbike.year}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="color" className="block font-medium">
                Màu sắc
              </label>
              <input
                type="text"
                id="color"
                value={motorbike.color}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </form>
        </div>

        {/* Thông Tin Bổ Sung */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Thông Tin Bổ Sung</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="fuelType" className="block font-medium">
                Loại Nhiên Liệu
              </label>
              <select
                id="fuelType"
                value={motorbike.fuelType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Petrol">Xăng</option>
                <option value="Electric">Điện</option>
              </select>
            </div>
            <div>
              <label htmlFor="dailyRate" className="block font-medium">
                Giá thuê mỗi ngày (VND)
              </label>
              <input
                type="number"
                id="dailyRate"
                value={motorbike.dailyRate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="status" className="block font-medium">
                Trạng thái
              </label>
              <select
                id="status"
                value={motorbike.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Sẵn sàng">Sẵn sàng</option>
                <option value="Đang thuê">Đang thuê</option>
                <option value="Bảo dưỡng">Bảo dưỡng</option>
              </select>
            </div>
            <div>
              <label htmlFor="engineCapacity" className="block font-medium">
                Dung tích động cơ (cc)
              </label>
              <input
                type="number"
                id="engineCapacity"
                value={motorbike.engineCapacity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </form>
          <div className="flex justify-start space-x-4 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thêm
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

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo hãng xe, mẫu xe hoặc màu sắc..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium">Hãng Xe</th>
              <th className="p-3 text-left font-medium">Mẫu Xe</th>
              <th className="p-3 text-left font-medium">Năm</th>
              <th className="p-3 text-left font-medium">Màu</th>
              <th className="p-3 text-left font-medium">Dung Tích</th>
              <th className="p-3 text-left font-medium">Trạng Thái</th>
              <th className="p-3 text-left font-medium">Giá Thuê</th>
              <th className="p-3 text-left font-medium">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredMotorbikes.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.make}</td>
                <td className="p-3">{item.model}</td>
                <td className="p-3">{item.year}</td>
                <td className="p-3">{item.color}</td>
                <td className="p-3">{item.engineCapacity} cc</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.dailyRate.toLocaleString()} VND</td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleFillForm(item)}
                    className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    <Edit className="w-5 h-5" />
                    
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MotorbikeManagement;
